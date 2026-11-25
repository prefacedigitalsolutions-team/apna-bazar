"use client";

import { useState } from "react";
import "./home-faq.css";

const FAQ_ITEMS = [
  {
    question: "How does Apna Bazar ensure product quality and freshness?",
    answer:
      "Every item featured on Apna Bazar goes through basic quality and packaging checks before listing, so customers receive reliable everyday essentials and specialty picks.",
  },
  {
    question: "Are all product prices inclusive of standard store display clarity?",
    answer:
      "Yes. All listed items display clear prices in ₹ so you can compare products and seasonal offers without confusing markups.",
  },
  {
    question: "How quickly do newly added products or seasonal offers go live?",
    answer:
      "Once a product or seasonal selection is published in the store catalog, it becomes available on the storefront right away for shoppers to browse.",
  },
  {
    question: "Can I browse Apna Bazar smoothly on both mobile and desktop screens?",
    answer:
      "Yes. Our storefront sections are built with responsive layouts that adapt cleanly across mobile phones, tablets, and wide desktop displays.",
  },
  {
    question: "How do I check current seasonal offers and featured picks?",
    answer:
      "You can scroll through our featured catalog and seasonal offer banner directly on the home page to spot highlighted essentials and deals.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section aria-label="Frequently Asked Questions" className="home-faq">
      <div className="home-faq__inner">
        <div className="home-faq__header">
          <span className="home-faq__eyebrow">Answers &amp; Clarity</span>
          <h2 className="home-faq__title">Frequently Asked Questions</h2>
          <p className="home-faq__subtitle">
            Clear answers about product quality, pricing transparency, and browsing Apna Bazar.
          </p>
        </div>

        <div className="home-faq__list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="home-faq__item">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(index)}
                  className="home-faq__question"
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="home-faq__icon">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="home-faq__answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}