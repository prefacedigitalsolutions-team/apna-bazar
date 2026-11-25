"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import "./home-bannar.css";

const HERO_SLIDES = [
  {
    id: 1,
    tag: "100% CERTIFIED ORGANIC",
    title: "Pure Food. Zero Chemicals.",
    subtitle: "Cold-pressed oils, unpolished grains & farm-fresh staples.",
    ctaText: "Shop Organic Now",
    ctaLink: "/products",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 2,
    tag: "KACHI GHANI & A2 BILONA",
    title: "Golden Purity in Every Drop.",
    subtitle: "Traditional wood-pressed oils & hand-churned A2 cow ghee.",
    ctaText: "Explore Oils & Ghee",
    ctaLink: "/products",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 3,
    tag: "RAW HIMALAYAN HARVEST",
    title: "Unprocessed Honey & Spices.",
    subtitle: "Straight from sustainable farms to your kitchen shelf.",
    ctaText: "View 200+ Products",
    ctaLink: "/products",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=85",
  },
];

export default function HomeBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bannerRef = useRef(null);
  const imageWrapRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { scale: 1.12, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          ".hb-anim",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }
    }, bannerRef);

    return () => ctx.revert();
  }, [current]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[current];

  return (
    <section
      ref={bannerRef}
      className="hb-hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Store Promotions"
    >
      <div className="hb-media-wrap">
        <div ref={imageWrapRef} key={slide.id} className="hb-img-motion">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={current === 0}
            sizes="100vw"
            className="hb-bg-img"
          />
        </div>
        <div className="hb-overlay" />
      </div>

      <div className="hb-inner">
        <div ref={contentRef} className="hb-copy">
          <span className="hb-tag hb-anim">{slide.tag}</span>
          <h1 className="hb-heading hb-anim">{slide.title}</h1>
          <p className="hb-subtext hb-anim">{slide.subtitle}</p>

          <div className="hb-cta-group hb-anim">
            <Link href={slide.ctaLink} className="hb-primary-btn">
              {slide.ctaText}
            </Link>
            <Link href="/contact" className="hb-outline-btn">
              Bulk & Wholesale
            </Link>
          </div>
        </div>

        <div className="hb-footer-bar">
          <div className="hb-indicators" role="tablist" aria-label="Slide navigation">
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={current === index}
                aria-label={`Show slide ${index + 1}`}
                className={`hb-bar-dot ${current === index ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>

          <div className="hb-nav-arrows">
            <button type="button" onClick={handlePrev} aria-label="Previous slide">
              ‹
            </button>
            <button type="button" onClick={handleNext} aria-label="Next slide">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}