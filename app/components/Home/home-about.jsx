"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import "./home-about.css";

const ABOUT_CONFIG = {
  eyebrow: "THE APNA BAZAR WAY",
  heading: "Real Food Without The Noise.",
  lead: "No hidden fillers, no bleached shortcuts—just honest staples straight from trusted growers to your kitchen.",
  image:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1500&q=85",
  imageAlt: "Organic spices, natural grains, and kitchen ingredients",
  pillars: [
    {
      id: "sourcing",
      tab: "01. Direct Farms",
      title: "Sourced Where It Grows Best",
      detail:
        "We work directly with farmers and regional millers so every grain, oil, and spice carries its true origin.",
      badge: "Farm-Direct Traceability",
    },
    {
      id: "purity",
      tab: "02. Zero Chemicals",
      title: "Nothing Artificial Added",
      detail:
        "Free from synthetic colors, chemical preservatives, and harsh refining—keeping natural taste and nutrition intact.",
      badge: "Clean Label Promise",
    },
    {
      id: "batches",
      tab: "03. Fresh Batches",
      title: "Crafted in Controlled Lots",
      detail:
        "Processed and packed in fresh batches across 200+ everyday SKUs so your pantry stays crisp and aromatic.",
      badge: "200+ Daily Essentials",
    },
  ],
  metrics: [
    { number: "200+", label: "Organic SKUs" },
    { number: "0%", label: "Added Chemicals" },
    { number: "100%", label: "Real Ingredients" },
  ],
  primaryCta: { label: "Shop All Products", href: "/products" },
  secondaryCta: { label: "Talk to Us", href: "/contact" },
};

export default function HomeAbout() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const detailRef = useRef(null);

  const currentPillar = ABOUT_CONFIG.pillars[activeTab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ha-stagger", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!detailRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        detailRef.current,
        { y: 8, opacity: 0.45 },
        {
          y: 0,
          opacity: 1,
          duration: 0.32,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="ha-section"
      aria-label="About Apna Bazar"
    >
      <div className="ha-container">
        <div className="ha-layout">
          {/* Visual Showcase Card */}
          <div className="ha-visual-col ha-stagger">
            <div className="ha-photo-wrap">
              <Image
                src={ABOUT_CONFIG.image}
                alt={ABOUT_CONFIG.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="ha-photo"
              />
              <span className="ha-photo-tag">{currentPillar.badge}</span>
            </div>

            <div className="ha-metrics-strip">
              {ABOUT_CONFIG.metrics.map((m) => (
                <div key={m.label} className="ha-metric">
                  <strong>{m.number}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Brand Hook & Copy */}
          <div className="ha-copy-col">
            <span className="ha-eyebrow ha-stagger">{ABOUT_CONFIG.eyebrow}</span>
            <h2 className="ha-title ha-stagger">{ABOUT_CONFIG.heading}</h2>
            <p className="ha-lead ha-stagger">{ABOUT_CONFIG.lead}</p>

            <div
              className="ha-tabs ha-stagger"
              role="tablist"
              aria-label="Brand promises"
            >
              {ABOUT_CONFIG.pillars.map((pillar, idx) => (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === idx}
                  className={`ha-tab-btn ${activeTab === idx ? "is-active" : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {pillar.tab}
                </button>
              ))}
            </div>

            <div ref={detailRef} className="ha-detail-box ha-stagger">
              <h3>{currentPillar.title}</h3>
              <p>{currentPillar.detail}</p>
            </div>

            <div className="ha-cta-row ha-stagger">
              <Link href={ABOUT_CONFIG.primaryCta.href} className="ha-btn-main">
                {ABOUT_CONFIG.primaryCta.label}
              </Link>
              <Link href={ABOUT_CONFIG.secondaryCta.href} className="ha-btn-ghost">
                {ABOUT_CONFIG.secondaryCta.label} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}