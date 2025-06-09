import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const icons = [
  { name: "Goals", icon: "✓", completed: true },
  { name: "Habits", icon: "🔄", completed: false, active: true },
  { name: "About", icon: "👤", completed: false },
  { name: "Plan", icon: "📋", completed: false },
  { name: "Review", icon: "⭐", completed: false },
];

export default function CalculateSpendingPage({ onBack, onNext }) {
  const [drinksPerWeek, setDrinksPerWeek] = useState(null);
  const [spendPerDrink, setSpendPerDrink] = useState(null);
  const [weeklySpend, setWeeklySpend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklySpend = async () => {
      try {
        const res = await fetch("https://healthapp-backend-i5i6.onrender.com/api/weekly-spend");
        const data = await res.json();
        setWeeklySpend(data.totalPerWeek);
      } catch (err) {
        console.error("Failed to fetch weekly spend", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeeklySpend();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-purple-700">Loading...</div>;
  }

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

      {/* Card */}
      <div className="relative flex justify-center items-center w-full mt-4">
        <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-10 flex-grow flex flex-col items-center">
          {/* Progress Icons */}
          <div className="flex justify-between items-center mb-6 w-full">
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

          {/* Summary Text */}
          <p className="text-center text-lg mb-8">
            At <span className="font-semibold text-purple-700">{drinksPerWeek}</span> drinks per
            week, you're spending around{" "}
            <span className="font-semibold text-purple-700">${weeklySpend}</span> per week on alcohol.
          </p>

          {/* Spend Circle */}
          <div className="w-60 h-60 rounded-full bg-purple-200 bg-opacity-30 border-4 border-purple-500 flex flex-col justify-center items-center mb-6">
            <span className="text-4xl font-bold text-purple-800">${weeklySpend}</span>
            <span className="text-sm font-medium text-purple-600 mt-2">Weekly Alcohol Spend</span>
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
