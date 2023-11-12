import React from 'react';

export default function SaleBanner() {
  return (
    <div className="sale-banner-container">
      <div className="sale-desc">
        <div className="left">
          <p>Ends Sunday</p>
          <h3>3-Day Sale</h3>
          <h4>Featuring Holiday Deals Right now</h4>
          <p />
        </div>
        <div className="right">
          <h3>Shop More Items </h3>
          <p>Tis the Season</p>
        </div>

        <img
          src="/assets/speaker2.webp"
          alt="footerlogo"
          className="Sale-banner-image"
        />
      </div>

    </div>
  );
}
