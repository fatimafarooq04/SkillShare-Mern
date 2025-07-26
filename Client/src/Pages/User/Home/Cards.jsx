import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaExchangeAlt, FaChalkboardTeacher } from 'react-icons/fa';
import './Home.css';

const cardData = [
  {
    icon: <FaUserGraduate size={40} color="#FF99C8" />,
    title: "Learn from Real People",
    text: "Connect with students and professionals sharing practical knowledge.",
    direction: 'left',
  },
  {
    icon: <FaExchangeAlt size={40} color="#FCF6BD" />,
    title: "No Cost, Just Value",
    text: "Forget fees. Trade your skill with someone else's — simple and fair.",
    direction: 'up',
  },
  {
    icon: <FaChalkboardTeacher size={40} color="#A9DEF9" />,
    title: "Build Your Reputation",
    text: "Teaching helps you grow and stand out. Help others, build your portfolio.",
    direction: 'right',
  },
];

// Animation variants based on direction
const getVariant = (direction) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 60 : 0,
    x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
});

const Cards = () => {
  return (
    <div className="container my-5">
      <motion.h2
        className="text-center my-5 section-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        Why Choose SkillStitch?
      </motion.h2>

      <div className="row justify-content-center g-4">
        {cardData.map((card, index) => (
          <motion.div
            className="col-12 col-md-6 col-lg-4"
            key={index}
            variants={getVariant(card.direction)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            // whileHover={{ scale: 1.05, rotateZ: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="h-100 text-center p-3 shadow-sm animated-card unique-card">
              <Card.Body>
                <div className="mb-3">{card.icon}</div>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
