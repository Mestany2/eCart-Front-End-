/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { checkOutOrder, getUserOpenOrder } from '../api/OrderApi';
import NavBar from '../components/NavBar';
import { deleteItem } from '../api/ItemsApi';
import getPayments from '../api/PaymentsApi';
import { checkUser } from '../utils/auth';

export default function OrderItems() {
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const [formData, setFormData] = useState();
  const [payments, setPayments] = useState();
  const [myUser, setMyUser] = useState();

  const myOrder = items && items[0]?.orders[0];

  const orderTotal = () => {
    const totalPrices = items && items?.filter((item) => item.price);
    const ordersTotal = totalPrices?.reduce((a, b) => a + b.price, 0);
    const totalValue = ordersTotal?.toFixed(2);
    setTotal(totalValue);
  };

  const checkOut = () => {
    const formattedDate = new Date().toISOString().split('T')[0];
    const payload = {
      ...formData, UserId: user[0].id, OrderTotal: total, StatusId: 2, OrderDate: formattedDate,
    };
    if (!payload.paymentId) {
      window.alert('Please select a payment');
    } else {
      checkOutOrder(myOrder.id, payload);
      window.alert('Thank you, Order Submitted');
      router.push('/');
    }
  };

  const onUpdate = () => {
    getUserOpenOrder(user[0].id).then((data) => setItems(data));
  };

  const deleteAnItem = (itemId) => {
    if (window.confirm('Delete This Item?')) {
      deleteItem(myOrder.id, itemId).then(() => onUpdate());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserOpenOrder(user[0]?.id);
      setItems(data);
    };
    fetchData();
    getPayments().then((data) => setPayments(data));
    checkUser(user.uid).then((data) => setMyUser(data[0]));
  }, []);
  useEffect(() => {
    if (items) {
      orderTotal();
    }
  }, [items]);
  return (
    <>

      <NavBar />
      <h1>Shopping Cart:</h1>
      {items ? (
        <div className="product-container">
          {items?.map((item) => (
            <div className="product" key={item.id}>
              <img src={item?.image} alt="Item" className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => deleteAnItem(item.id)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>Cart is empty</h2>
      )}

      <div className="cart-bottom">
        {myUser ? (
          <div className="btn-container">
            <button type="button" className="btn" onClick={checkOut}>
              Check Out
            </button>
          </div>
        ) : (
          <div className="btn-container">
            <h3>Please Sign in to checkout</h3>
          </div>
        )}

        <Link href="/AllItems">
          <button className="shop-more" type="button">Continue Shopping</button>
        </Link>
      </div>
      <div className="Payment-container">
        <Form>
          <Form.Group className="mb-30" controlId="formBasicEmail">
            <br />
            <h1 id="welcome-title"> Submit Payment </h1>
            <br />
            <FloatingLabel controlId="floatingSelect" label="Payment">
              <Form.Select
                aria-label="Payment"
                name="paymentId"
                onChange={(e) => setFormData(({ ...formData, paymentId: e.target.value }))}
                className="mb-3"
                value={formData?.paymentId} // FIXME: modify code to remove error
                required
              >
                <option value="">Select Payment</option>
                {
            payments?.map((payment) => (
              <option
                key={payment.id}
                value={payment.id}
              >
                {payment.type}
              </option>
            ))
          }
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </div>
      <div className="total">
        <h2>Subtotal: </h2>
        <h2> ${total}</h2>
      </div>
    </>
  );
}
