import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Review", icon: "⭐" },
];

export default function HabitsIntroPage({ onBack, onNext }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [focusHabit, setFocusHabit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < icons.length) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setFocusHabit(true), 1000);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="p-2 rounded hover:bg-gray-200 transition"
          aria-label="Back"
        >
          <ArrowLeft className="text-gray-700" />
        </button>
      </div>
      <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-8 mt-4 relative z-10 overflow-hidden">

      {/* Icons or Focused Habit */}
      {!focusHabit && (
        <motion.div
          className="flex space-x-4 mb-10 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {icons.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={item.name}
              className="text-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      )}

      {focusHabit && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-7xl mb-4"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🔄
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Habits</h2>
          <p className="max-w-md text-gray-600">
            Now that you've shared your goals, let's explore your current habits,
            which we'll use to personalize your Sunnyside plan.
          </p>
        </motion.div>
      )}

      {/* Next Button */}
      {focusHabit && (
        <div className="absolute bottom-6 right-6">
          <button
            onClick={onNext}
            className="p-3 rounded-full shadow bg-purple-600 text-white hover:bg-purple-700 transition"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
