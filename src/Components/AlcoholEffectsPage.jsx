import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const icons = [
  { name: "Goals", icon: "✓", completed: true },
  { name: "Habits", icon: "🔄", completed: false, active: true },
  { name: "About", icon: "👤", completed: false },
  { name: "Plan", icon: "📋", completed: false },
  { name: "Review", icon: "⭐", completed: false },
];

const options = [
  "Less than once a month",
  "1-2 times per month",
  "1-2 times per week",
  "3-4 times per week",
  "Daily or almost daily"
];

export default function AlcoholEffectsPage({ onBack, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    try {
      const response = await fetch("https://healthapp-backend-i5i6.onrender.com/api/save-alcohol-frequency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alcoholEffectFrequency: option }),
      });
      if (!response.ok) throw new Error("Failed to save selection");
      console.log("Saved:", option);
      onNext && onNext(); // move to next page if callback provided
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col">
      {/* Top header */}
      <div className="w-full flex justify-center mb-6">
      <div className="w-full max-w-5xl py-4 px-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="p-2 hover:bg-purple-200 rounded"
          aria-label="Back"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold flex-grow text-center">Your Habits</h1>
      </div>
      </div>

      {/* White card */}
      <div className="relative flex justify-center items-center w-full mt-4">
        <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-10 flex-grow flex flex-col items-center">

          {/* Step Icons */}
          <div className="flex justify-between items-center mb-6 w-full">
            {icons.map((item, idx) => {
              const isActive = item.active;
              return (
                <div key={item.name} className="flex flex-col items-center flex-1">
                  <div
                    className={`text-2xl rounded-full border-2 w-8 h-8 flex items-center justify-center ${
                      isActive
                        ? "border-blue-500 bg-blue-100 text-blue-600"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Prompt */}
          <motion.h2
            className="text-2xl font-semibold text-center text-purple-800 mb-10"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            How often do you wake up feeling the negative effects of alcohol?
            <br />
            <span className="text-sm font-normal text-purple-600">
              (Headache, stomach issues, brain fog, low energy, etc.)
            </span>
          </motion.h2>

          {/* Option Boxes */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            <AnimatePresence>
              {options.map((option, index) => (
                <motion.div
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`cursor-pointer text-center py-4 px-6 rounded-2xl 
                    ${selectedOption === option ? "bg-purple-400 text-white" : "bg-purple-300/30 text-purple-900"}
                    font-medium border border-purple-400 hover:bg-purple-300/50 transition`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {option}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Floating Next Button (optional use case) */}
          <div className="flex justify-end mt-10 w-full">
            <button
              onClick={onNext}
              className="p-4 rounded-full shadow text-white bg-purple-400 hover:bg-purple-500 transition"
            >
              <ArrowRight />
            </button>
          </div> 
        </div>
      </div>
    </div>
  );
}
