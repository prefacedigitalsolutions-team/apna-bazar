import "./home-static.css";

export default function HomeStaticOffer() {
  return (
    <section aria-label="Apna Bazar Seasonal Offer" className="offer-banner">
      <div className="offer-banner__overlay">
        <div className="offer-banner__inner">
          <span className="offer-banner__eyebrow">Seasonal Edit</span>
          <h2 className="offer-banner__title">
            Curated Pantry &amp; Daily Essentials
          </h2>
          <p className="offer-banner__subtitle">
            Quality-checked staples and seasonal selections with clear ₹ pricing, crafted for everyday kitchens.
          </p>
        </div>
      </div>
    </section>
  );
}