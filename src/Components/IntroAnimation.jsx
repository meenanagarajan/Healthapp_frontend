import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Start", icon: "🚀" },
];

export default function IntroAnimation({ onComplete }) {
  const [step, setStep] = useState(0);
  const [showIcons, setShowIcons] = useState(true);
  const [showTarget, setShowTarget] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < icons.length) return prev + 1;
        clearInterval(interval);

        // Wait before fading out icons
        setTimeout(() => {
          setShowIcons(false);
        }, 500);

        // Wait even more before showing the main section
        setTimeout(() => {
          setShowTarget(true);
        }, 1000);

        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-full max-w-xl max-h-[80vh] overflow-y-auto relative flex flex-col items-center">
        
        {/* Animate icons in and out */}
        <AnimatePresence>
          {showIcons && (
            <motion.div
              key="icons"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="flex gap-4 mb-6 flex-wrap justify-center"
            >
              {icons.slice(0, step).map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-2xl"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="text-sm text-gray-600">{item.name}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Goals section */}
        <AnimatePresence>
          {showTarget && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-6xl bg-blue-500 text-white rounded-full p-6">🎯</div>
              <h1 className="text-2xl font-bold mt-4">Your Goals</h1>
              <p className="text-gray-600 max-w-md mt-2">
                We'll start by learning about your high-level goals for healthier drinking.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {showTarget && (
          <button
            onClick={onComplete}
            className="absolute bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
