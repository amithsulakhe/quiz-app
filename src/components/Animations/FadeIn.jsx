// components/Animations/FadeIn.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const FadeIn = ({ children, delay = 0, duration = 0.5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

// components/Animations/SlideIn.jsx

export const SlideIn = ({ children, direction = 'up', delay = 0, duration = 0.5 }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration, delay, type: 'spring', stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  );
};

// components/Animations/ScaleIn.jsx

export const ScaleIn = ({ children, delay = 0, duration = 0.5 }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration, delay, type: 'spring', stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  );
};

// components/Animations/Confetti.jsx

export const Confetti = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Random colors
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff0000', '#00ff00', '#0000ff'],
        });
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ff0000', '#00ff00', '#0000ff'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  return null;
};