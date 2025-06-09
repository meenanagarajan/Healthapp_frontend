import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Start", icon: "🚀" },
];
const options = [
  {
    id: 1,
    title: "Drink Less",
    description: "I'd like to continue drinking, but with healthier habits.",
  },
  {
    id: 2,
    title: "Complete Zero",
    description: "I eventually want to cut alcohol out entirely.",
  },
  {
    id: 3,
    title: "I'm not sure yet",
    description: "I know I want to make a change, but I'm not sure where it'll take me.",
  },
];
const LIGHT_BLUE_BG = "#DBEAFE"; // The same light blue color for options boxes

export default function IdealOutcomePage({ onBack, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleNext(optionId) {
    if (!optionId) return;
    setLoading(true);

    try {
      console.log("Saving ideal outcome ID:", optionId);
      const response = await fetch("https://healthapp-backend-i5i6.onrender.com/api/save-ideal-outcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idealOutcomeId: optionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save ideal outcome");
      }

      setLoading(false);
      onNext(optionId);
    } catch (error) {
      setLoading(false);
      console.error("Error saving ideal outcome:", error);
      alert("Failed to save your choice. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl py-4 px-6 flex justify-between items-center">
        <button onClick={onBack} className="p-2 hover:bg-blue-200 rounded" disabled={loading}>
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">Your Ideal Outcome</h1>
        <div style={{ width: 40 }} />
      </div>

      {/* White Card */}
      <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-8 mt-4">
      {/* Progress Bar / Icons */}
      <div className="flex justify-between items-center mb-6">
          {icons.map((item, idx) => {
            const isActive = idx === 0; // current step index is 1
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
        {/* Prompt */}
        <p className="text-xl mb-8 text-gray-800 font-semibold text-center">
          What's your ideal outcome when it comes to changing your relationship with alcohol?
        </p>

        {/* Options - vertical with animation */}
        <div className="flex flex-col gap-6 justify-center">
          {options.map(({ id, title, description }, index) => {
            const isSelected = selectedOption === id;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, type: "spring", stiffness: 100 }}
                onClick={() => {
                  if (loading) return;
                  setSelectedOption(id);
                  handleNext(id);
                }}
                className={`rounded-2xl p-6 cursor-pointer hover:shadow-lg transition relative ${
                  isSelected ? "ring-2 ring-blue-600" : ""
                }`}
                style={{ backgroundColor: LIGHT_BLUE_BG }}
              >
                <h2 className="text-xl font-bold text-blue-900 mb-2">{title}</h2>
                <p className="text-sm text-blue-900 font-normal">{description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Next Button - Optional: If you want to keep it */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => handleNext(selectedOption)}
            disabled={!selectedOption || loading}
            className={`p-4 rounded-full shadow text-white transition
              ${
                selectedOption && !loading
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
