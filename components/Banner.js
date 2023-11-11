/* eslint-disable jsx-a11y/control-has-associated-label */
import Link from 'next/link';
import React from 'react';

export default function Banner() {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">Electronics</p>
        <h3>Christmas Sale</h3>
        <h1>Deals</h1>
        <img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/en/support/laptop-user-guide/img/laptop.png" alt="headphones" className="hero-banner-image" />

        <div>
          <Link href="/AllItems">
            <button type="button">Shop Now</button>
          </Link>
          <div className="desc">
            <h5>Shop From Home</h5>
            <p>Limited quantities. No rainchecks.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
