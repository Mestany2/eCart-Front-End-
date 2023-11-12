import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { getAllItems } from '../api/ItemsApi';
import NavBar from '../components/NavBar';
import SaleBanner from '../components/SaleBanner';

export default function AllItems() {
  const [items, setItems] = useState();

  useEffect(() => {
    getAllItems().then((data) => setItems(data));
  });

  return (
    <>
      <NavBar />
      <SaleBanner />
      <div className="products-container">
        {items?.map((item) => <ItemCard itemObj={item} />)}
      </div>
    </>
  );
}
