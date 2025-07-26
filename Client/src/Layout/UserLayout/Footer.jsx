import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.css'; // or create Footer.css if you prefer

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div
        className="footer-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Left Column */}
        <div className="footer-section about">
          <h4>SkillStitch</h4>
          <p>Connecting learners & teachers through skill-based exchange. Grow by teaching. Learn by sharing.</p>
        </div>

        {/* Center Column */}
        <div className="footer-section links">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="footer-section contact">
          <h5>Contact Us</h5>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="mailto:info@skillstitch.com"><FaEnvelope /></a>
          </div>
        </div>
      </motion.div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SkillStitch. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
