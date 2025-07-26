import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaSearch, FaHandshake } from 'react-icons/fa';
import './Home.css'; // assuming styles are in Home.css

const steps = [
  {
    icon: <FaUserCircle />,
    title: "Create Profile",
    desc: "Sign up and define your skills or what you want to learn.",
  },
  {
    icon: <FaSearch />,
    title: "Match Skills",
    desc: "Explore other users and find a perfect match to exchange skills.",
  },
  {
    icon: <FaHandshake />,
    title: "Connect & Exchange",
    desc: "Start learning and teaching through one-on-one skill sessions.",
  }
];

// Animation variants
const stepVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
};

const connectorVariant = {
  hidden: { opacity: 0, rotate: -20, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const HowItWorks = () => {
  return (
    <section className="how-flow-section">
      <motion.h2
        className="flow-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        How It Works
      </motion.h2>

      <div className="flow-wrapper">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="flow-step"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={stepVariant}
            >
              <motion.div
                className="flow-icon"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.icon}
              </motion.div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>

            {index !== steps.length - 1 && (
              <motion.div
                className="flow-connector"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                variants={connectorVariant}
              >
                ➤
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
