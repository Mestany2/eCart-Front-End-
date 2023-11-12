import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function CategoryCard({ catObj }) {
  return (
    <div>
      <Link passHref href={`${catObj.id}`}>
        <div className="product-card">
          <Image
            src={catObj.categoryImage}
            alt="image"
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{catObj.categoryName}</p>
        </div>
      </Link>
    </div>
  );
}

CategoryCard.propTypes = {
  catObj: PropTypes.shape({
    id: PropTypes.number,
    categoryName: PropTypes.string,
    categoryImage: PropTypes.string,
  }).isRequired,
};
