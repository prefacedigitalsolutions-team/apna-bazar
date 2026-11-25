import "./productBannar.css";

export default function ProductBannar({ totalProducts = 0 }) {
  return (
    <section className="ab-banner" aria-label="All Products Banner">
      <div className="ab-banner-inner">
        <p className="ab-banner-eyebrow">APNA BAZAR STOREFRONT</p>
        <h1 className="ab-banner-title">All Products</h1>
        <p className="ab-banner-subtitle">
          Har category ke fresh aur curated products ko alag-alag section ya filter ke zariye easily browse karein.
        </p>
        <div className="ab-banner-meta">
          Total Available Products: {totalProducts}
        </div>
      </div>
    </section>
  );
}