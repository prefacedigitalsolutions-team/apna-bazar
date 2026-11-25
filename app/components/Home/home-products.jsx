"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import "./home-products.css";

const CATEGORIES = [
  { id: "all", label: "All 12 Daily Picks" },
  { id: "pantry-essentials", label: "Ghee, Salt & Honey" },
  { id: "bakery-spreads", label: "Biscuit, Toast & Jam" },
  { id: "breakfast-beverages", label: "Breakfast & Beverages" },
];

const TWELVE_PRODUCTS = [
  {
    id: "prd-ghee",
    sku: "SKU-001",
    name: "A2 Bilona Cow Ghee",
    category: "pantry-essentials",
    pack: "500 ml",
    price: "₹950",
    badge: "Ghee",
    shortNote: "Hand-churned golden aroma for daily tadka.",
    ingredients: "100% A2 Cow Milk Fat (Bilona Method)",
    shelfLife: "12 Months • Store in cool, dry place",
    usageTip: "Ideal for dal, rotis, and morning wellness.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIM5WfT7pYDAQX2pAmzG0R3Xk5EZUv6uHLxM8FrZ5g19SF7TvZWgLhrgMx&s=10",
  },
  {
    id: "prd-biscuit",
    sku: "SKU-002",
    name: "Jaggery Choco Cookies",
    category: "bakery-spreads",
    pack: "250 g",
    price: "₹140",
    badge: "Biscuit",
    shortNote: "Crunchy baked biscuits made with natural jaggery.",
    ingredients: "Whole Wheat Flour, Organic Jaggery, Cocoa, Butter",
    shelfLife: "6 Months • Keep airtight after opening",
    usageTip: "Great evening snack with tea or milk.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb5ElRY29ft08zZ7QWD-WoieAsohQQgb_vcwNinp8fsl9b0KciauVy8-Ez&s=10",
  },
  {
    id: "prd-toast",
    sku: "SKU-003",
    name: "Crispy Rusk & Toast",
    category: "bakery-spreads",
    pack: "300 g",
    price: "₹95",
    badge: "Toast",
    shortNote: "Double-baked crisp breakfast toast slices.",
    ingredients: "Wheat Flour, Yeast, Edible Oil, Cardamom Hint",
    shelfLife: "4 Months • Store in a dry container",
    usageTip: "Pair with butter, jam, or hot masala chai.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zFd01oFLlYaDZLhSArHXxUfb0CDUt4qwDZvPJNX7xflsFsEemTfKxV-j&s=10",
  },
  {
    id: "prd-jam",
    sku: "SKU-004",
    name: "Real Strawberry Fruit Jam",
    category: "bakery-spreads",
    pack: "350 g",
    price: "₹185",
    badge: "Jam",
    shortNote: "Rich fruit pulp spread with natural sweetness.",
    ingredients: "Fresh Strawberries, Raw Sugar, Lemon Juice, Pectin",
    shelfLife: "9 Months • Refrigerate after opening",
    usageTip: "Spread over warm toast, rotis, or pancakes.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrc8GmnsZR8dOFWTPXDHdejsE0c7ClvCsLaBCI1nkYj4PTQDmmTzsxZrY&s=10",
  },
  {
    id: "prd-salt",
    sku: "SKU-005",
    name: "Natural Mineral Sea Salt",
    category: "pantry-essentials",
    pack: "1 kg",
    price: "₹75",
    badge: "Namak",
    shortNote: "Unrefined mineral-rich kitchen salt for daily cooking.",
    ingredients: "100% Natural Evaporated Sea Salt",
    shelfLife: "24 Months • Keep moisture-free",
    usageTip: "Balanced seasoning for sabzis, salads, and dough.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESHw90mZBFINT_5biae4MVaf5GWKTDp5Il2uzwCNn7nzLsWpTNlmMUds&s=10",
  },
  {
    id: "prd-honey",
    sku: "SKU-006",
    name: "Raw Wild Forest Honey",
    category: "pantry-essentials",
    pack: "500 g",
    price: "₹360",
    badge: "Honey",
    shortNote: "Thick, raw floral honey with natural enzymes.",
    ingredients: "100% Raw Unprocessed Blossom Honey",
    shelfLife: "18 Months • Natural crystallization is normal",
    usageTip: "Stir into warm water, tea, or oats.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg8-yGgGPa2MJNIw45a32xYSowc7qj4Uo3OodIWvsy09B64GWe0p9uD90&s=10",
  },
  {
    id: "prd-oats",
    sku: "SKU-007",
    name: "Rolled Breakfast Oats",
    category: "breakfast-beverages",
    pack: "800 g",
    price: "₹190",
    badge: "Breakfast",
    shortNote: "Wholesome rolled grains for quick morning bowls.",
    ingredients: "100% Whole Rolled Oat Flakes",
    shelfLife: "12 Months • Seal pack tightly",
    usageTip: "Cook with milk or water and top with fruits.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz13GdjWY8HONdZQXV80Tf1GOTmersx6S6PmginJ-_HWOCyacsmYzr38Y&s=10",
  },
  {
    id: "prd-nuts",
    sku: "SKU-008",
    name: "California Almonds & Cashews",
    category: "pantry-essentials",
    pack: "500 g",
    price: "₹540",
    badge: "Dry Fruits",
    shortNote: "Crisp whole nuts packed for everyday snacking.",
    ingredients: "Whole Almonds & W240 Cashew Kernels",
    shelfLife: "9 Months • Store in airtight jar",
    usageTip: "Soak overnight or roast lightly for snacks.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ZOIH1HKsOTH1jUCbnueNtSmn4s2Nv3Pm_pZctx2yR3OGJtblzKCOP6A0&s=10",
  },
  {
    id: "prd-coffee",
    sku: "SKU-009",
    name: "Medium Roast Arabica Beans",
    category: "breakfast-beverages",
    pack: "250 g",
    price: "₹320",
    badge: "Coffee",
    shortNote: "Aromatic roasted beans for rich morning brews.",
    ingredients: "100% Single-Estate Roasted Coffee Beans",
    shelfLife: "9 Months • Keep away from direct sunlight",
    usageTip: "Grind fresh for filter coffee, French press, or moka pot.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi3_LxLbBcN7be6tM1uubLcrkOPL3pFgLWi8XtKJOY1Cg_3ZNxeSUPF_h7&s=10",
  },
  {
    id: "prd-chocolate",
    sku: "SKU-010",
    name: "70% Dark Cocoa Bar",
    category: "bakery-spreads",
    pack: "100 g",
    price: "₹160",
    badge: "Chocolate",
    shortNote: "Bold dark chocolate squares with deep cocoa notes.",
    ingredients: "Cocoa Mass, Raw Cane Sugar, Cocoa Butter",
    shelfLife: "12 Months • Store below 22°C",
    usageTip: "Enjoy a square post-meal or melt in desserts.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStP6APBQcXITeV9cPMTTuEDZqysRz_vrNSZX9ZA3wz5JN51WpNFZB7WhHd&s=10",
  },
  {
    id: "prd-greentea",
    sku: "SKU-011",
    name: "Himalayan Green Tea Leaves",
    category: "breakfast-beverages",
    pack: "150 g",
    price: "₹210",
    badge: "Tea",
    shortNote: "Light, refreshing whole-leaf tea for calm breaks.",
    ingredients: "100% Whole Green Tea Leaves",
    shelfLife: "15 Months • Keep in opaque container",
    usageTip: "Steep in hot water (not boiling) for 2–3 minutes.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nU3qmjkemB9VLxclRM56cI4nS2a5PC2RkonyDYhw0nBXbKYqCPYlW2I&s=10",
  },
  {
    id: "prd-pantryjar",
    sku: "SKU-012",
    name: "Kitchen Spice & Sugar Duo",
    category: "pantry-essentials",
    pack: "Set of 2",
    price: "₹690",
    badge: "Pantry Set",
    shortNote: "Handy everyday countertop jars for kitchen staples.",
    ingredients: "Food-Safe Countertop Storage Set",
    shelfLife: "Long-Term Kitchen Use",
    usageTip: "Keep sugar, masala, or daily dry mixes handy.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdXERtlFp3u3WgRYdEUiptWBnjZolrHT7lGekiaek9fFqpOjIkKlyo1bA&s=10",
  },
];

export default function HomeProducts() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [activeProductId, setActiveProductId] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const drawerRef = useRef(null);

  const visibleProducts =
    selectedCat === "all"
      ? TWELVE_PRODUCTS
      : TWELVE_PRODUCTS.filter((item) => item.category === selectedCat);

  const selectedProduct =
    TWELVE_PRODUCTS.find((item) => item.id === activeProductId) || null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hp-head-anim", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hp-card",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [selectedCat]);

  useEffect(() => {
    if (!selectedProduct || !drawerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        drawerRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedProduct]);

  const handleShopClick = (id) => {
    setActiveProductId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="hp-section"
      aria-label="Daily Essential Products"
    >
      <div className="hp-container">
        <div className="hp-top-bar">
          <div>
            <span className="hp-eyebrow hp-head-anim">
              EVERYDAY STAPLES • 12 QUICK PICKS
            </span>
            <h2 className="hp-heading hp-head-anim">
              Daily Favorites For Every Home
            </h2>
          </div>

          <Link href="/products" className="hp-view-all hp-head-anim">
            Explore Full Catalog (200+ SKUs) →
          </Link>
        </div>

        <div
          className="hp-cat-bar hp-head-anim"
          role="tablist"
          aria-label="Filter daily products"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCat === cat.id}
              className={`hp-cat-btn ${selectedCat === cat.id ? "is-active" : ""}`}
              onClick={() => setSelectedCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="hp-grid">
          {visibleProducts.map((product) => {
            const isSelected = activeProductId === product.id;

            return (
              <article
                key={product.id}
                className={`hp-card ${isSelected ? "is-selected" : ""}`}
              >
                <div className="hp-img-box">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="hp-img"
                  />
                  <span className="hp-badge">{product.badge}</span>
                </div>

                <div className="hp-card-body">
                  <div className="hp-meta-top">
                    <span className="hp-pack">{product.pack}</span>
                    <span className="hp-sku">{product.sku}</span>
                  </div>

                  <h3 className="hp-title">{product.name}</h3>
                  <p className="hp-short-note">{product.shortNote}</p>

                  <div className="hp-bottom-row">
                    <strong className="hp-price">{product.price}</strong>
                    <button
                      type="button"
                      className="hp-shop-btn"
                      onClick={() => handleShopClick(product.id)}
                      aria-expanded={isSelected}
                    >
                      {isSelected ? "Hide Details" : "Shop Now"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {selectedProduct && (
          <div ref={drawerRef} className="hp-detail-panel" role="region">
            <div className="hp-detail-head">
              <div>
                <span className="hp-detail-tag">
                  {selectedProduct.badge} • {selectedProduct.sku}
                </span>
                <h3 className="hp-detail-title">
                  {selectedProduct.name} ({selectedProduct.pack}) —{" "}
                  <span>{selectedProduct.price}</span>
                </h3>
              </div>

              <button
                type="button"
                className="hp-close-btn"
                onClick={() => setActiveProductId(null)}
                aria-label="Close product details"
              >
                ✕
              </button>
            </div>

            <div className="hp-detail-grid">
              <div className="hp-detail-box">
                <strong>Key Ingredients</strong>
                <p>{selectedProduct.ingredients}</p>
              </div>
              <div className="hp-detail-box">
                <strong>Best Way To Use</strong>
                <p>{selectedProduct.usageTip}</p>
              </div>
              <div className="hp-detail-box">
                <strong>Shelf Life & Storage</strong>
                <p>{selectedProduct.shelfLife}</p>
              </div>
            </div>

            <div className="hp-detail-actions">
              <Link href="/contact" className="hp-order-btn">
                Order / Enquire Now
              </Link>
              <Link href="/products" className="hp-all-link">
                See All Products →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}