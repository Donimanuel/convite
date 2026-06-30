/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is touch-enabled
    const checkDevice = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches || 
        navigator.maxTouchPoints > 0
      );
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return () => window.removeEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Randomly spawn sparkles
      if (Math.random() < 0.15) {
        const id = Date.now() + Math.random();
        const newSparkle: Sparkle = {
          id,
          x: e.clientX + (Math.random() * 20 - 10),
          y: e.clientY + (Math.random() * 20 - 10),
          size: Math.random() * 6 + 4,
        };
        
        setSparkles((prev) => [...prev.slice(-15), newSparkle]); // keep last 15 sparkles
        
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkDevice);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0)`,
          border: "2px solid #C7A86D",
          transition: "transform 0.08s ease-out",
        }}
      />
      {/* Small center dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 bg-[#C7A86D]"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      />
      {/* Sparkles trailing behind */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-40 bg-gradient-to-tr from-[#E6D0A7] to-[#C7A86D] animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: 0.6,
          }}
        />
      ))}
    </>
  );
}
