import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCategoryItems } from '../api/CategoriesApi';
import ItemCard from '../components/ItemCard';
import NavBar from '../components/NavBar';
import SaleBanner from '../components/SaleBanner';

export default function CategoryItems() {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState();

  useEffect(() => {
    getCategoryItems(id).then((data) => setItems(data));
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
