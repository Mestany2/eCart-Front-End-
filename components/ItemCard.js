/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { checkUser } from '../utils/auth';

export default function ItemCard({ itemObj }) {
  const { user } = useAuth();
  const [myUser, setMyUser] = useState();
  const router = useRouter();

  const updateForm = () => {
    router.push({
      pathname: '/ItemFormPage',
      query: {
        itemObj: JSON.stringify(itemObj),
      },
    });
  };

  useEffect(() => {
    checkUser(user?.uid).then((data) => setMyUser(data[0]));
  }, []);

  return (
    <div>
      <Link passHref href={`/ItemDetails/${itemObj.id}`}>
        <div className="product-card">
          <Image
            src={itemObj.image}
            alt="image"
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{itemObj.name}</p>
          <p className="product-price">{itemObj.price}</p>
        </div>
      </Link>
      {myUser?.isSeller ? (
        <button type="button" onClick={updateForm}>Edit</button>
      )
        : ('')}

    </div>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};
