import React, { useState, useEffect } from "react";

const TypingLoop: React.FC<{ text: string; speed?: number }> = ({ text, speed = 200 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => text.slice(0, (index % (text.length + 1))));
      setIndex((prev) => (prev + 1) % (text.length + 1));
    }, speed);

    return () => clearInterval(interval);
  }, [index, text, speed]);

  return <span>{displayedText}</span>;
};

export default TypingLoop;
