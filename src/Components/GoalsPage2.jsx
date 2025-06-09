import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Start", icon: "🚀" },
];

export default function GoalsPage2({ onBack, onNext, selectedGoals, primaryGoal }) {
  const [selectedPrimaryGoal, setSelectedPrimaryGoal] = useState(primaryGoal || null);
  const [loading, setLoading] = useState(false);
  const [animateAndRedirect, setAnimateAndRedirect] = useState(false);

  const handleTileClick = (goal) => {
    if (loading || animateAndRedirect) return;
    setSelectedPrimaryGoal(goal);
    setAnimateAndRedirect(true);
  };

  useEffect(() => {
    if (animateAndRedirect && selectedPrimaryGoal) {
      const timer = setTimeout(async () => {
        setLoading(true);
        try {
          const response = await fetch("https://healthapp-backend-i5i6.onrender.com/api/primary-goal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ primaryGoal: selectedPrimaryGoal }),
          });
          if (!response.ok) throw new Error("Failed to save primary goal");
          onNext(selectedPrimaryGoal);
        } catch (error) {
          console.error("Error saving primary goal:", error);
          alert("There was a problem saving your goal.");
          setAnimateAndRedirect(false);
        } finally {
          setLoading(false);
        }
      }, 1000); // animation duration
      return () => clearTimeout(timer);
    }
  }, [animateAndRedirect, selectedPrimaryGoal, onNext]);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-blue-100 py-4 px-6 flex items-center justify-between max-w-5xl">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="p-2 hover:bg-blue-200 rounded"
          disabled={loading}
        >
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-center flex-1">Your Goals</h1>
        <div style={{ width: 40 }} />
      </div>

      {/* White Card */}
      <div className="bg-white w-1/2 mt-6 rounded-xl shadow-md p-6 relative">
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
        <div className="mb-1 text-lg font-semibold">
          Thanks for sharing! Which of these goals feels most important to you right now?
        </div>
        <div className="mb-6 text-sm text-gray-600">Choose one:</div>

        {/* Goal Selection Tiles */}
        <div className="grid grid-cols-2 gap-4 mb-6 relative">
          {selectedGoals.map((goal) => {
            const isSelected = selectedPrimaryGoal === goal;

            if (animateAndRedirect && isSelected) {
              return (
                <motion.button
                  key={goal}
                  initial={{ position: "relative" }}
                  animate={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  transition={{ duration: 1 }}
                  className="border rounded-lg p-4 text-left cursor-pointer bg-blue-100 border-blue-800 text-blue-900"
                  aria-pressed={true}
                  disabled={true}
                >
                  {goal}
                </motion.button>
              );
            }

            if (animateAndRedirect && !isSelected) {
              return (
                <button
                  key={goal}
                  className="hidden"
                  disabled={true}
                >
                  {goal}
                </button>
              );
            }

            return (
              <button
                key={goal}
                onClick={() => handleTileClick(goal)}
                className={`border rounded-lg p-4 text-left transition cursor-pointer 
                  bg-blue-100 ${
                    isSelected
                      ? "border-blue-800 text-blue-900"
                      : "border-blue-300 hover:border-blue-500 text-gray-800"
                  }`}
                aria-pressed={isSelected}
                disabled={loading}
              >
                {goal}
              </button>
            );
          })}
        </div>

        {/* Next button hidden during animation */}
        {!animateAndRedirect && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (selectedPrimaryGoal) setAnimateAndRedirect(true);
              }}
              disabled={!selectedPrimaryGoal || loading}
              aria-label="Next"
              className={`p-3 rounded-full shadow text-white transition ${
                !selectedPrimaryGoal || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "..." : <ArrowRight />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
