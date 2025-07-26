import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';

const CTABanner = () => {
  return (
    <div className="cta-banner">
      <motion.h2
        className="cta-heading"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        Ready to Exchange Your Skills?
      </motion.h2>

      <motion.p
        className="cta-subtext"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        Join a growing community of learners and teachers. It’s free and easy!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <Link to="/signup" className="cta-button">
          Get Started Now
        </Link>
      </motion.div>
    </div>
  );
};

export default CTABanner;
