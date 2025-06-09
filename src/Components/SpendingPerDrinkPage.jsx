import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const icons = [
  { name: "Goals", icon: "✓", completed: true },
  { name: "Habits", icon: "🔄", completed: false, active: true },
  { name: "About", icon: "👤", completed: false },
  { name: "Plan", icon: "📋", completed: false },
  { name: "Review", icon: "⭐", completed: false },
];

export default function SpendingPerDrinkPage({ spendPerDrink, setSpendPerDrink, onNext, onBack }) {
  
  const [input, setInput] = useState(spendPerDrink?.toString() || "");
  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(val)) {
      setInput(val);
      setSpendPerDrink(Number(val));
    }
  };
  const saveSpendPerDrinkToBackend = async (value) => {
    const response = await fetch("https://healthapp-backend-i5i6.onrender.com/api/save-spend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spendPerDrink: value }),
    });
    if (!response.ok) throw new Error("Failed to save spending data");
  };
  const handleNext = async () => {
    if (input === "" || isNaN(Number(input))) return;
  
    try {
      await saveSpendPerDrinkToBackend(Number(input));
      onNext(); // go to next page
    } catch (err) {
      console.error("Error saving spend per drink:", err);
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
        <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-8 relative z-10 overflow-hidden flex-grow">
          {/* Progress Icons */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            {icons.map((item, idx) => {
              const isActive = idx === 1;
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
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <p className="text-center text-lg mb-4">
                On average, how much would you estimate you{" "}
                <span className="text-purple-700 font-semibold"> spend per drink?</span>
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
                We'll use this to estimate your personalized savings as you start to cut back.
                If you aren't sure, we recommend{" "}
                <span className="text-purple-700 font-semibold">$8</span> as a starting point.
            </p>
            </motion.div>


          {/* Input row */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-3xl text-black-500 font-bold">$</span>
            <input
              type="text"
              inputMode="decimal"
              pattern="^\d*(\.\d{0,2})?$"
              className="text-center border border-gray-300 rounded-lg w-32 py-2 text-3xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={input}
              onChange={handleChange}
              aria-label="Spend per drink"
            />
            <button
              onClick={handleNext}
              className="p-4 rounded-full shadow text-white bg-purple-400 hover:bg-purple-500 transition"
              aria-label="Next"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
