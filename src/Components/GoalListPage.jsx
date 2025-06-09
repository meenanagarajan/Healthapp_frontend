import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const icons = [
    { name: "Goals", icon: "🎯" },
    { name: "Habits", icon: "🔄" },
    { name: "About", icon: "👤" },
    { name: "Plan", icon: "📋" },
    { name: "Start", icon: "🚀" },
  ];

const options = [
  { id: 1, title: "Reduce Stress" },
  { id: 2, title: "Improve Sleep" },
  { id: 3, title: "Save Money" },
  // add more options here as needed
];

// Custom messages based on selected title
const customMessages = {
  "Improve health and Wellness": "Resulting in a happier, healthier you.",
  "Slow Down Effects of Aging": "Allowing you to age gracefully, with lower impact on your health.",
  "Lose Weight and Improve Fitness": "Helping you reach your weight and fitness goals.",
  "Improve Sleep Quality": "Resulting in deeper, more restul sleep",
  "Avoid Hangovers": "Resulting in fewer next day effects, and brighter, more productive days.",
  "Stop Blacking or Graying Out": "Resulting in lower impact to memory, and brighter, more productive days.",
  "Save Money": "Resulting in less money spent on alcohol, and more dollars in your pocket.",
  "Find healthier Coping Strategies": "Resulting in less reliance on alcohol for coping, and healthier strategies in its place.",
  "Reduce Stress and Anxietyy": "Resulting in lower stress and anxiety, and improved overall mental health.",
  "Improve Relationships": "Resulting in healthier relationships with the people who matter to you.",
};

const LIGHT_BLUE_BG = "#DBEAFE"; // The same light blue color for options boxes

export default function GoalListPage({onBack, onNext }) {
    const [primaryGoal, setPrimaryGoal] = useState("");

    useEffect(() => {
        const fetchGoal = async () => {
          try {
            const res = await fetch("https://healthapp-backend-i5i6.onrender.com/api/user-selections");
            const data = await res.json();
    
            if (data.primaryGoal) {
                setPrimaryGoal(customMessages[data.primaryGoal]);
            }
          } catch (error) {
            console.error("Failed to fetch primary goal:", error);
          }
        };
    
        fetchGoal();
      }, []);
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
        {/* Header Row */}
      <div className="w-full max-w-5xl py-4 px-6 flex justify-between items-center">
        <button onClick={onBack} className="p-2 hover:bg-blue-200 rounded">
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">Your Goals</h1>
        <div style={{ width: 40 }} />
      </div>
      {/* White card container */}
      <div className="relative bg-white rounded-3xl shadow-xl max-w-3xl w-full p-10 flex flex-col">
        
        {/* Step Progress (top icons) */}
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
        {/* Prompt text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font text-blue-900 mb-8 z-10 relative"
        >
          With SunnySide, we'll work together to:
        </motion.h2>

        {/* Options list */}
        <div className="flex flex-col space-y-6 z-10 relative">
          {options.map((option, idx) => (
            <motion.div
              key={option.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 * idx, type: "spring", stiffness: 100 }}
              className="rounded-2xl p-6 cursor-pointer hover:shadow-lg transition relative"
              style={{ backgroundColor: LIGHT_BLUE_BG }}
            >
              <h3 className="text-xl font-medium text-blue-800">{option.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Custom message below options */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: options.length * 0.3 + 0.3 }}
          className="mt-12 max-w-3xl text-center text-gray-600 text-lg italic z-10 relative"
        >
          {primaryGoal}
        </motion.p>

        {/* Floating Next Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onNext}
            className="p-4 rounded-full shadow text-white bg-blue-400 hover:bg-blue-500 transition"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
