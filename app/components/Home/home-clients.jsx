import "./home-clients.css";

const CLIENT_REVIEWS = [
  {
    name: "Ananya Sharma",
    role: "Home Baker & Regular Shopper",
    rating: 5,
    quote:
      "Pantry essentials aur seasonal picks ka selection clean aur reliable hai. Price clarity aur overall quality dono kaafi achhi lagi.",
  },
  {
    name: "Rohan Verma",
    role: "Family Household Buyer",
    rating: 5,
    quote:
      "Rozmarra ke items browse karna aur compare karna kaafi aasaan hai. Store ka layout bina kisi clutter ke bilkul seedha aur clear hai.",
  },
  {
    name: "Meera Nair",
    role: "Wellness & Kitchen Enthusiast",
    rating: 4,
    quote:
      "Featured items aur offers aasani se mil jaate hain. Mobile aur desktop dono par experience smooth aur fast rehta hai.",
  },
];

function RatingStars({ rating = 5 }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div
      className="home-clients__rating"
      aria-label={`Rating: ${safeRating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          aria-hidden="true"
          className={
            star <= safeRating
              ? "home-clients__star--filled"
              : "home-clients__star--empty"
          }
        >
          ★
        </span>
      ))}
      <span className="home-clients__score">{safeRating}.0 / 5</span>
    </div>
  );
}

export default function HomeClients() {
  return (
    <section aria-label="Our Clients" className="home-clients">
      <div className="home-clients__inner">
        <div className="home-clients__header">
          <span className="home-clients__eyebrow">Our Clients</span>
          <h2 className="home-clients__title">Trusted by Everyday Shoppers</h2>
          <p className="home-clients__subtitle">
            Feedback and star ratings from customers who shop Apna Bazar for daily essentials and curated picks.
          </p>
        </div>

        <div className="home-clients__grid">
          {CLIENT_REVIEWS.map((client) => (
            <article key={client.name} className="home-clients__card">
              <div>
                <div className="home-clients__top">
                  <RatingStars rating={client.rating} />
                </div>
                <p className="home-clients__quote">&ldquo;{client.quote}&rdquo;</p>
              </div>

              <div className="home-clients__meta">
                <p className="home-clients__name">{client.name}</p>
                <p className="home-clients__role">{client.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}