"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import "./Navbar.css";

const BRAND = {
  name: "Apna Bazar",
  tagline: "100% Organic & Chemical-Free Foods",
  searchPlaceholder: "Search organic grains, cold-pressed oils, spices...",
};

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ab-gsap-item", {
        y: -12,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".ab-mobile-item", {
        y: -8,
        opacity: 0,
        duration: 0.28,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    }, drawerRef);

    return () => ctx.revert();
  }, [menuOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    console.log("Search query:", clean);
    setMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="ab-header">
      <div className="ab-top-strip">
        <span>{BRAND.tagline} • Farm-to-Kitchen Freshness</span>
      </div>

      <div className="ab-nav-main">
        <div className="ab-nav-container">
          <Link
            href="/"
            className="ab-brand ab-gsap-item"
            onClick={() => setMenuOpen(false)}
          >
            <span className="ab-brand-mark" aria-hidden="true">
              🌿
            </span>
            <span className="ab-brand-name">{BRAND.name}</span>
          </Link>

          <form
            className="ab-search ab-gsap-item"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={BRAND.searchPlaceholder}
              aria-label="Search organic food products"
            />
            <button type="submit">Search</button>
          </form>

          <nav
            className="ab-links ab-gsap-item"
            aria-label="Main navigation"
          >
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/all-products" onClick={() => setMenuOpen(false)}>
              All Products
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <Link
              href="/cart"
              className="ab-cart-btn"
              onClick={() => setMenuOpen(false)}
            >
              <span>Cart</span>
              <strong className="ab-cart-count">0</strong>
            </Link>
          </nav>

          <button
            type="button"
            className="ab-burger ab-gsap-item"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div ref={drawerRef} className="ab-mobile-drawer">
          <Link
            href="/"
            className="ab-mobile-item"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/all-products"
            className="ab-mobile-item"
            onClick={() => setMenuOpen(false)}
          >
            All Products
          </Link>
          <Link
            href="/contact"
            className="ab-mobile-item"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/cart"
            className="ab-mobile-item ab-mobile-cart"
            onClick={() => setMenuOpen(false)}
          >
            <span>Cart</span>
            <strong className="ab-cart-count">0</strong>
          </Link>
        </div>
      )}
    </header>
  );
}