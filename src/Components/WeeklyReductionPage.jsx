import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function AlcoholReductionResultPage({ onBack, onNext }) {
  const [startingDrinks, setStartingDrinks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://healthapp-backend-i5i6.onrender.com/api/total-drinks");
        const data = await res.json();
        setStartingDrinks(data.totalDrinks); // backend must return { weeklyDrinks: number }
      } catch (err) {
        console.error("Failed to fetch drinks data:", err);
      }
    };
    fetchData();
  }, []);

  if (startingDrinks === null) {
    return <div className="text-center mt-20 text-purple-600">Loading...</div>;
  }

  const reducedDrinks = Math.round(startingDrinks * 0.68);

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

      {/* Main Card */}
      <div className="relative flex justify-center items-center w-full mt-4">
        <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-10 flex-grow flex flex-col items-center">

          {/* Stepper Icons (can reuse same stepper as before) */}
          <div className="flex justify-between items-center mb-6 w-full">
            {[
                { name: "Goals", icon: "✓", completed: true },
                { name: "Habits", icon: "🔄", completed: false, active: true },
                { name: "About", icon: "👤", completed: false },
                { name: "Plan", icon: "📋", completed: false },
                { name: "Review", icon: "⭐", completed: false },
            ].map((item) => (
              <div key={item.name} className="flex flex-col items-center flex-1">
                <div
                  className={`text-2xl rounded-full border-2 w-8 h-8 flex items-center justify-center ${
                    item.active
                      ? "border-blue-500 bg-blue-100 text-blue-600"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt */}
          <motion.h2
            className="text-left text-xl text-black-800 mb-10"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            On average, Sunnyside members reduce their {" "}
            <span className="text-lg font-normal text-purple-600">weekly</span> consumption by {" "}
            <span className="text-lg font-normal text-purple-600">32% in the first 30 days.†</span>
            <br/>
            <p className="text-lg text-left font-normal text-balack-600">Here's what this could look like for you:</p>
          </motion.h2>

          {/* SVG Curve Visualization with animation */}
          <motion.svg
            viewBox="0 0 400 220"
            className="w-full max-w-lg h-52 mb-8"
            initial="hidden"
            animate="visible"
          >
            {/* Deeper downward curve */}
            <motion.path
              d="M 50 60 C 150 10, 250 10, 350 180"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 1.5, ease: "easeInOut" }
                }
              }}
            />

            {/* Start Point (text ends at the end of the line) */}
            <motion.circle cx="50" cy="60" r="6" fill="#8B5CF6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
            <motion.line
              x1="50"
              y1="60"
              x2="50"   // same x for vertical line
              y2="20"   // smaller y for upward line
              stroke="#8B5CF6"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            />

            <motion.text
              x="50"
              y="10" // above the line endpoint
              textAnchor="middle"
              className="fill-purple-800 text-sm font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
            <tspan x="50" dy="0">
              Your Starting Point
            </tspan>
            <tspan x="50" dy="1.2em">
              {startingDrinks} weekly drinks
            </tspan>
            </motion.text>


            {/* End Point (text ends at the end of the line) */}
              <motion.circle
                cx="350"
                cy="180"
                r="6"
                fill="#8B5CF6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
              />
              <motion.line
                x1="350"
                y1="180"
                x2="380"   // same x for vertical line
                y2="140"   // smaller y to go up
                stroke="#8B5CF6"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              />
              <motion.text
                x="380"           // aligned with line x
                y="120"           // above line end y2=140
                textAnchor="middle"  // center text horizontally on x
                className="fill-purple-800 text-sm font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <tspan x="385" dy="0">
                  In 30 Days
                </tspan>
                <tspan x="385" dy="1.2em">
                  {reducedDrinks} weekly drinks
                </tspan>
              </motion.text>


          </motion.svg>

          {/* Next Button */}
          <div className="flex justify-end w-full">
            <button
              onClick={onNext}
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
