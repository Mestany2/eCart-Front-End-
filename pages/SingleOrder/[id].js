import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import ItemCard from '../../components/ItemCard';
import { getOrderItems } from '../../api/OrderApi';

export default function OrderItems() {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState();

  useEffect(() => {
    getOrderItems(id).then((data) => setItems(data));
  });

  return (
    <>
      <NavBar />
      <div>
        <h3>Order : {id}</h3>
      </div>
      <Link passHref href="/ListOfOrders">
        <Button variant="primary"> Back to my orders </Button>
      </Link>
      <div className="products-container">
        {items?.map((item) => <ItemCard itemObj={item} />)}
      </div>
    </>
  );
}
