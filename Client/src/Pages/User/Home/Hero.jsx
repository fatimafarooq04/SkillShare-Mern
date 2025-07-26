import React from "react";
import { motion } from "framer-motion";
import Button from "../../../Components/Common/Button";
import "./Home.css";
import { TypeAnimation } from "react-type-animation";
import BgVideo from "./BgVideo";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="hero-section">
      <BgVideo />

      <div className="hero-overlay">
        <motion.div
          className="hero-content-left"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h1
            className="hero-title"
            variants={fadeInUp}
            transition={{ duration: 1 }}
          >
            Your Skills, Your Currency.
          </motion.h1>

          <motion.p
            className="hero-type-line"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <TypeAnimation
              sequence={[
                "Skill to Learn", 2000,
                "Skill to Teach", 2000,
                "Skill to Share", 2000,
                "Skill to Grow", 2000,
              ]}
              wrapper="span"
              speed={50}
              // style={{ fontSize: '2em', display: 'inline-block' }}
              repeat={Infinity}
              className="typing-text"
            />
          </motion.p>

          <motion.p
            className="hero-description"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Collaborate with others. Trade your expertise. Grow your potential.
            Whether you're a beginner or an expert, SkillStitch connects you with the right people to grow together.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button to="/signup">Get Started</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
