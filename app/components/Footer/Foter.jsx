import "./Foter.css";

export default function Foter() {
  return (
    <footer aria-label="Site Footer" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__brand-name">Apna Bazar</p>
            <p className="site-footer__brand-desc">
              Everyday essentials, curated selections, and transparent ₹ pricing designed for clean and reliable shopping.
            </p>
          </div>

          <div>
            <h3 className="site-footer__heading">Storefront</h3>
            <ul className="site-footer__list">
              <li>
                <a href="#products" className="site-footer__link">
                  Products Catalog
                </a>
              </li>
              <li>
                <a href="/admin" className="site-footer__link">
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="site-footer__heading">Trust &amp; Info</h3>
            <ul className="site-footer__list">
              <li>
                <span className="site-footer__meta-text">Clear ₹ Pricing</span>
              </li>
              <li>
                <span className="site-footer__meta-text">Quality-Checked Listings</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="site-footer__heading">Availability</h3>
            <ul className="site-footer__list">
              <li>
                <span className="site-footer__meta-text">
                  Online Storefront — Open 24×7
                </span>
              </li>
              <li>
                <span className="site-footer__meta-text">
                  Live Catalog Updates via Admin
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Apna Bazar. All rights reserved.</p>
          <p>Built with Next.js &amp; MongoDB</p>
        </div>
      </div>
    </footer>
  );
}