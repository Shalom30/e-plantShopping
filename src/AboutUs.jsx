import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Paradise Nursery</h1>
        <p className="tagline">Where Every Leaf Tells a Story</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2018, Paradise Nursery began as a small backyard greenhouse with a simple
            mission: to bring the beauty and benefits of plants into every home. What started as a
            passion project quickly grew into a thriving online plant shop trusted by thousands of
            plant lovers across the country.
          </p>
          <p>
            We believe that plants are more than decoration — they are living companions that
            purify your air, calm your mind, and bring life to your space.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make plant parenthood accessible, joyful, and sustainable. We
            carefully source each plant from responsible growers, ensuring that every purchase
            supports ethical and eco-friendly farming practices.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="about-list">
            <li>🌱 Hand-selected plants from trusted growers</li>
            <li>📦 Careful packaging to ensure safe delivery</li>
            <li>💚 Expert plant care guides with every order</li>
            <li>🌍 Committed to sustainable and eco-friendly practices</li>
            <li>🛒 Hassle-free returns within 30 days</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">🌿</div>
              <h3>Sarah Green</h3>
              <p>Founder & Head Botanist</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">🌸</div>
              <h3>Marcus Bloom</h3>
              <p>Plant Curator</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">🍃</div>
              <h3>Lily Chen</h3>
              <p>Customer Experience</p>
            </div>
          </div>
        </section>

        <section className="about-section contact-section">
          <h2>Contact Us</h2>
          <p>📧 hello@paradisenursery.com</p>
          <p>📞 1-800-PLANTS-1</p>
          <p>📍 123 Greenhouse Lane, Garden City, CA 90210</p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
