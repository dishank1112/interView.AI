"use client"
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = React.memo(() => {
  const largeElements = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      key: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
    }));
  }, []);

  const smallElements = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      key: i + 20,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-900">
      {largeElements.map(({ key, top, left, duration }) => (
        <motion.div
          key={key}
          className="absolute w-20 h-20 bg-yellow-500 opacity-20"
          style={{ top, left }}
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      {smallElements.map(({ key, top, left, duration, delay }) => (
        <motion.div
          key={key}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{ top, left }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay,
          }}
        />
      ))}
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;