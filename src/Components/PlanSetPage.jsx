import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const LIGHT_BLUE_BG = "#DBEAFE"; // same background color

const translucentCircleStyle = {
  position: "absolute",
  width: 300,
  height: 300,
  borderRadius: "50%",
  background:
    "radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 70%)", // blue translucent fade
  top: -100,
  right: -100,
  zIndex: 0,
};

const promptData = {
  1: {
    prompt: "Great! We'll design your plan around drinking less without quitting entirely.",
    subtext:
      "85% of Sunnyside members are also working towards this goal. You're in good company!",
  },
  2: {
    prompt: "Great! We'll design your plan around eventually cutting alcohol out entirely.",
    subtext:
      "The latest scientific guidelines point to cutting alcohol out entirely as the healthiest option. We'll get you to this goal at a pace that feels comfortable for you.",
  },
  3: {
    prompt:
      "No worries! We'll start your plan with a gradual reduction in drinks, and can determine next steps from there.",
    subtext:
      "97% of Sunnyside members report drinking less since joining Sunnyside. You're in good company!",
  },
};

const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Start", icon: "🚀" },
];

export default function PlanSetPage({ onBack, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true); // true while fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSelectedOption() {
      try {
        setLoading(true);
        const response = await fetch("https://healthapp-backend-i5i6.onrender.com/api/get-ideal-outcome");
        if (!response.ok) throw new Error("Failed to fetch selected option");

        const data = await response.json();
        // Assume the API returns something like { idealOutcomeId: 1 }
        if (data && data.idealOutcomeId && promptData[data.idealOutcomeId]) {
          setSelectedOption(data.idealOutcomeId);
        } else {
          setError("Invalid data from server");
        }
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedOption();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!selectedOption) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">No ideal outcome selected.</p>
      </div>
    );
  }

  const { prompt, subtext } = promptData[selectedOption];

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center relative overflow-hidden">
      {/* Translucent Circle */}
      <div style={translucentCircleStyle} />

      {/* Header */}
      <div className="w-full max-w-5xl py-4 px-6 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-blue-200 rounded"
          aria-label="Back"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">Your Ideal Outcome</h1>
        <div style={{ width: 40 }} />
      </div>

      {/* White Card */}
      <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-8 mt-4 relative z-10 overflow-hidden">
      <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.15 }}
            transition={{ duration: 1 }}
            className="absolute left-[-90px] w-96 h-96 bg-blue-300 rounded-full z-0"
            style={{ top: '120px' }} // moved lower
            />
        {/* Progress Bar / Icons */}
        <div className="flex justify-between items-center mb-6">
          {icons.map((item, idx) => {
            const isActive = idx === 0; // current step index = 1 (second step)
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
        <motion.p
          className="text-2xl mt-16 mb-8 text-gray-800 font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {prompt}
        </motion.p>

        {/* Subtext */}
        <motion.p
          className="text-l text-blue-900 font-normal"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {subtext}
        </motion.p>

        {/* Next Button */}
        <div className="flex justify-end mt-64"> {/* increased from mt-8 to mt-12 */}
        <button
            onClick={() => onNext(selectedOption)}
            className="p-4 rounded-full shadow text-white bg-blue-600 hover:bg-blue-700 transition"
            aria-label="Next"
        >
            <ArrowRight />
        </button>
        </div>
      </div>
    </div>
  );
}
