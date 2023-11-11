import Link from 'next/link';
import React from 'react';

export default function FooterBanner() {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>20% OFF</p>
          <h3>Holiday</h3>
          <h3>Sale</h3>
          <p />
        </div>
        <div className="right">
          <p>Electronics</p>
          <h3>Christmas Sale</h3>
          <p>Tis the Season</p>
          <Link href="/AllItems">
            <button type="button">Shop Now</button>
          </Link>
        </div>

        <img
          src="/assets/watch_2.webp"
          alt="footerlogo"
          className="footer-banner-image"
        />
      </div>
    </div>
  );
}
