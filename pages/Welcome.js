import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { getAllItems } from '../api/ItemsApi';
import ItemCard from '../components/ItemCard';

export default function Welcome() {
  const [items, setItems] = useState();

  useEffect(() => {
    getAllItems().then((data) => setItems(data));
  }, []);

  return (
    <>
      <Banner />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
      </div>
      <div className="products-container">
        {items?.map((item) => <ItemCard itemObj={item} />)}
      </div>
    </>
  );
}
