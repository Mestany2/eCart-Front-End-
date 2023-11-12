/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAllItems, getItemDetails } from '../../api/ItemsApi';
import ItemCard from '../../components/ItemCard';
import NavBar from '../../components/NavBar';
import { addItemToOpenOrder, createOrder, getUserOpenOrders } from '../../api/OrderApi';
import { useAuth } from '../../utils/context/authContext';
import { checkUser } from '../../utils/auth';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [item, setItem] = useState();
  const [products, setProducts] = useState();
  const [order, setOrder] = useState();
  const [, setNewOrder] = useState();
  const [myUser, setMyUser] = useState();

  const addItemToOrder = async () => {
    if (order !== 'No Open Order') {
      addItemToOpenOrder(order?.id, item);
      window.alert('Item added ');
    } else {
      const payload = {
        UserId: user[0].id, StatusId: 1,
      };
      const createdOrder = await
      createOrder(payload);
      setNewOrder(createdOrder);
      await
      addItemToOpenOrder(createdOrder?.id, item);
      window.alert('Item Added to The Cart');
    }
    // router.push('/');
  };

  useEffect(() => {
    if (id && (!item || id !== item.id)) {
      getItemDetails(id).then((data) => setItem(data));
    }
    getAllItems().then((data) => setProducts(data));
    getUserOpenOrders(user[0]?.id).then(setOrder);
    checkUser(user.uid).then((data) => setMyUser(data[0]));
  }, [id]);

  return (
    <>
      <NavBar />
      <div>
        <div className="product-detail-container">
          <div>
            <div className="image-container">
              <img src={item?.image} alt="item pic" className="product-detail-image" />
            </div>
            <div className="small-images-container" />
          </div>

          <div className="product-detail-desc">
            <h1>{item?.name}</h1>
            {/* <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>
                (20)
              </p>
            </div> */}
            <h4>Details: </h4>
            <p>{item?.description}</p>
            <p className="price">${item?.price}</p>
            { myUser ? (
              <div className="buttons">
                <button type="button" className="add-to-cart" onClick={addItemToOrder}>Add to Cart</button>
              </div>
            ) : (
              <div className="buttons">
                <p type="button" className="add-to-cart">Sign in to add items</p>
              </div>
            )}

          </div>
        </div>

        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products?.map((prod) => (
                <ItemCard itemObj={prod} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
