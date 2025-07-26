import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';

const testimonials = [
  { name: 'Ali', feedback: 'Great platform to learn and share skills.' },
  { name: 'Sara', feedback: 'Helped me find a great mentor!' },
  { name: 'Ahmed', feedback: 'I taught web development and improved my skills.' },
  { name: 'Zara', feedback: 'Amazing barter learning experience!' },
  { name: 'Fatima', feedback: 'This platform is a blessing for learners in Pakistan!' },
];

// Repeat the array to make the loop seamless
const repeatedTestimonials = [...testimonials, ...testimonials];

const TestimonialSection = () => {
  return (
    <div className="testimonial-section">
      <h2 className="testimonial-heading"> What Our Users Say</h2>

      {/* Top slider - left to right */}
      <motion.div
        className="testimonial-slider"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      >
        {repeatedTestimonials.map((t, index) => (
          <motion.div
            className="testimonial-card"
            key={index}
            whileHover={{ scale: 1.05 }}
          >
            <p className="quote">“{t.feedback}”</p>
            <h6 className="name">— {t.name}</h6>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom slider - right to left */}
      <motion.div
        className="testimonial-slider reverse"
        animate={{ x: ['-50%', '0%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      >
        {repeatedTestimonials.map((t, index) => (
          <motion.div
            className="testimonial-card"
            key={index}
            whileHover={{ scale: 1.05 }}
          >
            <p className="quote">“{t.feedback}”</p>
            <h6 className="name">— {t.name}</h6>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialSection;
