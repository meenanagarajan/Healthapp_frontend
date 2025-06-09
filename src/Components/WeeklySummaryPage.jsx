import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = [
  { name: "Goals", icon: "✓", completed: true },
  { name: "Habits", icon: "🔄", completed: false, active: true },
  { name: "About", icon: "👤", completed: false },
  { name: "Plan", icon: "📋", completed: false },
  { name: "Review", icon: "⭐", completed: false },
];

export default function WeeklySummaryPage({ onBack, onNext }) {
  const [showSummary, setShowSummary] = useState(false);
  const [drinksPerDay, setDrinksPerDay] = useState({});
  const [summary, setSummary] = useState({ totalDrinks: 0, dryDays: 0 });

  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    async function fetchDrinksData() {
      try {
        const res = await fetch("https://healthapp-backend-i5i6.onrender.com/api/drinks-per-day");
        if (!res.ok) throw new Error("Failed to fetch drinks data");
  
        const data = await res.json();
        setDrinksPerDay(data);
  
        // ✅ Summary calculation
        const total = Object.values(data).reduce((acc, val) => acc + Number(val), 0);
        const dry = Object.values(data).filter((val) => Number(val) === 0).length;
        setSummary({ totalDrinks: total, dryDays: dry });
  
        // ✅ Show summary after short delay
        setTimeout(() => {
          setShowSummary(true);
        }, 2000); // 1 second delay for animation or UX feel
  
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  
    fetchDrinksData();
  }, []);
  

if (loading) return <div>Loading drinks data...</div>;
if (error) return <div>Error: {error}</div>;


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

      {/* White card centered */}
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
                        ? "border-purple-500 bg-purple-100 text-purple-600"
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
          <p className="text-xl text-purple-700 mb-6 text-center">
            Based on your answers, here's what a typical week looks like for you today:
          </p>

          {/* Animated Table (fades out and moves up) */}
            <AnimatePresence>
            <div className="w-full flex justify-center mb-6">
            {!showSummary && (
                <motion.div
                key="table"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-md p-6 space-y-4"
                >
                {Object.entries(drinksPerDay).map(([day, count]) => (
                    <div key={day} className="flex justify-between text-lg">
                    <span className="font-medium text-gray-600">{day}</span>
                    <span className="font-semibold text-purple-700">
                        {count} drink{Number(count) !== 1 ? "s" : ""}
                    </span>
                    </div>
                ))}
                </motion.div>
            )}
            </div>
            </AnimatePresence>


            <AnimatePresence>
            <div className="w-full flex justify-center mb-6">
                {showSummary && (
                    <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row gap-6 mt-8 w-full max-w-xl justify-center items-center"
                    >
                    <div className="bg-purple-500 text-white rounded-2xl shadow-lg px-6 py-4 w-64 text-center">
                        <p className="text-sm">Total Drinks This Week</p>
                        <p className="text-3xl font-bold">{summary.totalDrinks}</p>
                    </div>
                    <div className="bg-purple-500 text-white rounded-2xl shadow-lg px-6 py-4 w-64 text-center">
                        <p className="text-sm">Dry Days</p>
                        <p className="text-3xl font-bold">{summary.dryDays}</p>
                    </div>
                    </motion.div>
                )}
                </div>
                </AnimatePresence>


                <AnimatePresence>
                <div className="w-full flex justify-center mb-6">
                {showSummary && (
                    <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-10 text-center text-gray-700"
                    >
                    <div className="bg-purple-500 text-white rounded-2xl shadow-lg px-6 py-4 w-64 text-center">
                        <p className="text-sm">Total Drinks This Week</p>
                    </div>
                    </motion.div>
                )}
                </div>
                </AnimatePresence>

                {/* Floating Next Button */}
                <div className="flex justify-end mt-6">
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
