import "./home-contact.css";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="home-contact__icon"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.48 0 .12 5.36.12 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.65a11.9 11.9 0 0 0 5.78 1.47h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.49-8.4zm-8.45 18.33h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.84 9.84 0 0 1-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.88-9.9 9.88zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className="home-contact__icon"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className="home-contact__icon"
    >
      <rect x="2" y="4" width="20" height="16" rx="0" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function HomeContact() {
  return (
    <section
      id="contact"
      aria-label="Contact Apna Bazar"
      className="home-contact"
    >
      <div className="home-contact__inner">
        <div className="home-contact__header">
          <span className="home-contact__eyebrow">Contact Us</span>
          <h2 className="home-contact__title">Reach Our Team Directly</h2>
          <p className="home-contact__subtitle">
            Connect with Apna Bazar via WhatsApp, phone call, or email for product details and support.
          </p>
        </div>

        <div className="home-contact__list">
          <div className="home-contact__item">
            <span className="home-contact__icon-wrap home-contact__icon-wrap--whatsapp">
              <WhatsAppIcon />
            </span>
            <div className="home-contact__details">
              <span className="home-contact__label">WhatsApp</span>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="home-contact__link"
              >
                +91 98765 43210
              </a>
              <p className="home-contact__meta">Instant chat for quick inquiries</p>
            </div>
          </div>

          <div className="home-contact__item">
            <span className="home-contact__icon-wrap">
              <PhoneIcon />
            </span>
            <div className="home-contact__details">
              <span className="home-contact__label">Mobile Number</span>
              <a href="tel:+919876543210" className="home-contact__link">
                +91 98765 43210
              </a>
              <p className="home-contact__meta">Call for order &amp; store assistance</p>
            </div>
          </div>

          <div className="home-contact__item">
            <span className="home-contact__icon-wrap">
              <MailIcon />
            </span>
            <div className="home-contact__details">
              <span className="home-contact__label">Email Address</span>
              <a
                href="mailto:support@apnabazar.in"
                className="home-contact__link"
              >
                support@apnabazar.in
              </a>
              <p className="home-contact__meta">Write to us for support &amp; feedback</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}