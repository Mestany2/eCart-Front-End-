import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';

import FooterBanner from '../components/FooterBanner';
import { getAllCategories } from '../api/CategoriesApi';
import CategoryCard from '../components/CategoryCard';
import NavBar from '../components/NavBar';
import { useAuth } from '../utils/context/authContext';
import { checkUser } from '../utils/auth';
import UserForm from '../components/forms/UserForm';

function Home() {
  const [categories, setCategories] = useState();
  const { user } = useAuth();
  const [myUser, setMyUser] = useState();

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    checkUser(user.uid).then((data) => setMyUser(data[0]));
  }, []);

  return (
    <>
      {myUser?.uid === user?.uid ? (
        <>
          <NavBar /><Banner />
          <div className="products-heading">
            <h2>Shop By Category</h2>
          </div>
          <div className="products-container">
            {categories?.map((cat) => <CategoryCard catObj={cat} />)}
          </div>
          <FooterBanner />
        </>
      ) : (
        <UserForm />
      )}

    </>
  );
}

export default Home;
