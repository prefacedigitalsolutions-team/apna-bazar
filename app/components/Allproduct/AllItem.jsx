"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import "./AllItem.css";

export default function AllItem({ products = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories list: lib/categories.js + database mein maujood koi extra category ho toh woh bhi
  const categories = useMemo(() => {
    const fromProducts = products
      .map((item) => item.category)
      .filter((cat) => typeof cat === "string" && cat.trim().length > 0);

    return Array.from(new Set([...PRODUCT_CATEGORIES, ...fromProducts]));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter(
      (item) => (item.category || "Uncategorized") === selectedCategory
    );
  }, [products, selectedCategory]);

  // "All" select hone par category-wise sections banayenge
  const groupedSections = useMemo(() => {
    if (selectedCategory !== "All") {
      return [
        {
          category: selectedCategory,
          items: filteredProducts,
        },
      ];
    }

    const groups = [];
    const seen = new Set();

    for (const cat of categories) {
      const items = products.filter((p) => p.category === cat);
      if (items.length > 0) {
        groups.push({ category: cat, items });
        seen.add(cat);
      }
    }

    const uncategorized = products.filter(
      (p) => !p.category || !seen.has(p.category)
    );
    if (uncategorized.length > 0) {
      groups.push({ category: "Uncategorized", items: uncategorized });
    }

    return groups;
  }, [categories, products, selectedCategory, filteredProducts]);

  return (
    <section className="ab-all-items" aria-label="Categorized Products">
      {/* Category Filter Buttons */}
      <div className="ab-filter-bar" role="tablist" aria-label="Filter by Category">
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          className={`ab-filter-btn ${selectedCategory === "All" ? "active" : ""}`}
        >
          All ({products.length})
        </button>

        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`ab-filter-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Category-Wise Sections */}
      {groupedSections.length === 0 ? (
        <div className="ab-empty-state">
          Is category mein abhi koi product available nahi hai.
        </div>
      ) : (
        groupedSections.map((group) => (
          <div key={group.category} className="ab-category-group">
            <div className="ab-category-header">
              <h2 className="ab-category-title">{group.category}</h2>
              <span className="ab-category-count">
                {group.items.length} {group.items.length === 1 ? "item" : "items"}
              </span>
            </div>

            {group.items.length === 0 ? (
              <div className="ab-empty-state">
                &quot;{group.category}&quot; mein abhi koi product add nahi hua hai.
              </div>
            ) : (
              <div className="ab-product-grid">
                {group.items.map((item) => (
                  <article key={item._id} className="ab-product-card">
                    <div>
                      <div className="ab-image-box">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 240px"
                          style={{ objectFit: "cover", borderRadius: 0 }}
                        />
                      </div>

                      <div className="ab-product-sku">{item.sku}</div>
                      <span className="ab-product-category-tag">
                        {item.category || "Uncategorized"}
                      </span>
                      <h3 className="ab-product-name">{item.name}</h3>
                    </div>

                    <div className="ab-product-price">₹{item.price}</div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}