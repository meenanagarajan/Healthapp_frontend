import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Start", icon: "🚀" },
];

const motivationOptions = [
  "Improve health and Wellness",
  "Slow Down Effects of Aging",
  "Lose Weight and Improve Fitness",
  "Improve Sleep Quality",
  "Avoid Hangovers",
  "Stop Blacking or Graying Out",
  "Save Money",
  "Find healthier Coping Strategies",
  "Reduce Stress and Anxietyy",
  "Improve Relationships",
];

export default function GoalsPage1({ onBack, onNext, selected, setSelected }) {
  const currentStepIndex = 0;
  const [loading, setLoading] = useState(false);

  const toggleSelect = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((o) => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const handleNext = async () => {
    if (selected.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch("https://healthapp-backend-i5i6.onrender.com/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedGoals: selected }),
      });

      if (!response.ok) throw new Error("Failed to send data to backend");

      const data = await response.json();
      console.log("Backend response:", data);
      onNext();
    } catch (error) {
      console.error("Error sending to backend:", error);
      alert("There was a problem saving your selection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header in blue */}
      <div className="w-full bg-blue-100 py-4 px-6 flex items-center justify-between max-w-5xl">
        <button
          onClick={onBack}
          className="p-2 hover:bg-blue-200 rounded"
          aria-label="Go back"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-center flex-1">Your Goals</h1>
        <div style={{ width: 40 }} />
      </div>

      {/* White Card */}
      <div className="bg-white w-1/2 mt-6 rounded-xl shadow-md p-6">
        {/* Progress Icons */}
        <div className="flex justify-between items-center mb-6">
        {icons.map((item, idx) => {
          const isActive = idx === 0;
          return (
            <div key={item.name} className="flex flex-col items-center flex-1">
              <div
                className={`text-2xl rounded-full border-2 w-8 h-8 flex items-center justify-center ${
                  isActive ? "border-blue-500 bg-blue-100 text-blue-600" : "border-gray-300 text-gray-400"
                }`}
              >
                {item.icon}
              </div>
            </div>
          );
        })}
      </div>

        {/* Question */}
        <div className="mb-1 text-lg font-semibold">
          First, the basics: what motivates you to want to improve your drinking habits?
        </div>
        <div className="mb-6 text-sm text-gray-600">Choose all that apply:</div>

        {/* Options Grid */}
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {motivationOptions.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => toggleSelect(option)}
                className={`border rounded-lg p-4 text-left transition cursor-pointer 
                  bg-blue-100 ${
                    isSelected
                      ? "border-blue-800 text-blue-900"
                      : "border-blue-300 hover:border-blue-500 text-gray-800"
                  }`}
                aria-pressed={isSelected}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            disabled={selected.length === 0 || loading}
            aria-label="Next"
            className={`p-3 rounded-full shadow text-white transition ${
              selected.length === 0 || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-700"
            }`}
          >
            {loading ? "..." : <ArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
}
