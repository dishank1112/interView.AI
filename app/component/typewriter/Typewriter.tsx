"use client";

import React, { useState, useEffect } from "react";

const Typewriter: React.FC = () => {
  const words = ["Started..."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setCurrentText((prev) => currentWord.substring(0, prev.length + 1));
        if (currentText === currentWord) {
          setIsDeleting(true);
        }
      }
    };

    const timeout = setTimeout(typeEffect, isDeleting ? 50 : 300);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, words, currentWordIndex]);

  return (
    <div className="flex justify-center items-center">
      <h1 id="typewriter" className="">
        {currentText}
        <span className="text-yellow-500">|</span>
      </h1>
    </div>
  );
};

export default Typewriter;
