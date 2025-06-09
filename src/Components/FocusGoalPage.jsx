import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Start", icon: "🚀" },
];
const goalTodesc = {
  "Improve health and Wellness": "Overall Health",
  "Slow Down Effects of Aging": "Effects of Aging",
  "Lose Weight and Improve Fitness": "Weight",
  "Improve Sleep Quality": "Sleep Quality",
  "Avoid Hangovers": "Hangovers",
  "Stop Blacking or Graying Out": "Impact on Memory",
  "Save Money": "Dollars Saved",
  "Find healthier Coping Strategies": "Emotional Resilience",
  "Reduce Stress and Anxietyy": "Stress & Anxiety",
  "Improve Relationships": "Relationship Quality",
};

const goalToRelation = {
  "Improve health and Wellness": "inverse",
  "Slow Down Effects of Aging": "direct",
  "Lose Weight and Improve Fitness": "direct",
  "Improve Sleep Quality": "inverse",
  "Avoid Hangovers": "direct",
  "Stop Blacking or Graying Out": "direct",
  "Save Money": "inverse",
  "Find healthier Coping Strategies": "inverse",
  "Reduce Stress and Anxietyy": "direct",
  "Improve Relationships": "inverse",
};

export default function FocusGoalPage({ onBack, onNext }) {
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [relationType, setRelationType] = useState("direct");

  // Refs for paths to get length and animate
  const curve1Ref = useRef(null);
  const curve2Ref = useRef(null);

  // States to hold path lengths
  const [curve1Length, setCurve1Length] = useState(0);
  const [curve2Length, setCurve2Length] = useState(0);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await fetch("https://healthapp-backend-i5i6.onrender.com/api/user-selections");
        const data = await res.json();

        if (data.primaryGoal) {
          setPrimaryGoal(goalTodesc[data.primaryGoal]);
          setRelationType(goalToRelation[data.primaryGoal] || "direct");
        }
      } catch (error) {
        console.error("Failed to fetch primary goal:", error);
      }
    };

    fetchGoal();
  }, []);

  // Get lengths after mount
  useEffect(() => {
    if (curve1Ref.current) {
      setCurve1Length(curve1Ref.current.getTotalLength());
    }
    if (curve2Ref.current) {
      setCurve2Length(curve2Ref.current.getTotalLength());
    }
  }, [relationType]); // recalc if relation type changes

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

      {/* White Card with Curves */}
      <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-8 mt-4 relative">
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

        {/* Message */}
        <p className="text-lg mb-6 text-gray-800">
          OK, we'll focus on helping you{" "}
          <span className="text-blue-600 font-semibold">
            improve the {primaryGoal?.toLowerCase() || "area"} that matters most to you.
          </span>
        </p>

        {/* SVG Curves */}
        <svg viewBox="0 0 600 300" className="w-full h-64">
          {relationType === "inverse" ? (
            <>
              {/* Inverse - intersecting curves */}
              <path
                ref={curve1Ref}
                id="curve1"
                d="M0,80 C150,40 450,260 600,220"
                stroke="#4cc3ff"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={curve1Length}
                strokeDashoffset={curve1Length}
                style={{
                  animation: `drawLine 2s ease forwards`,
                  animationDelay: "0s",
                }}
              />
              <text fontSize="16" fill="#4cc3ff" fontWeight="600" transform="translate(0, -20)">
                <textPath href="#curve1" startOffset="5%" dy="100">
                  Total Drinks
                </textPath>
              </text>

              <path
                ref={curve2Ref}
                id="curve2"
                d="M0,220 C150,260 450,40 600,80"
                stroke="#1e40af"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={curve2Length}
                strokeDashoffset={curve2Length}
                style={{
                  animation: `drawLine 2s ease forwards`,
                  animationDelay: "2.2s", // start after first finishes
                }}
              />
              <text fontSize="16" fill="#1e40af" fontWeight="600" transform="translate(0, 20)">
                <textPath href="#curve2" startOffset="5%" dy="100">
                  {primaryGoal || "Your Goal"}
                </textPath>
              </text>
            </>
          ) : (
            <>
              {/* Parallel downward frown curves starting higher and ending lower */}
              <path
                ref={curve1Ref}
                id="drinksPath"
                d="M0,60 C150,20 450,20 600,180"
                stroke="#4cc3ff"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={curve1Length}
                strokeDashoffset={curve1Length}
                style={{
                  animation: `drawLine 2s ease forwards`,
                  animationDelay: "0s",
                }}
              />
              <text fontSize="16" fill="#4cc3ff" fontWeight="600" transform="translate(0, -10)">
                <textPath href="#drinksPath" startOffset="5%" dy="-20">
                  Total Drinks
                </textPath>
              </text>

              <path
                ref={curve2Ref}
                id="goalPath"
                d="M0,150 C150,60 450,120 600,270"
                stroke="#1e40af"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={curve2Length}
                strokeDashoffset={curve2Length}
                style={{
                  animation: `drawLine 2s ease forwards`,
                  animationDelay: "2.2s",
                }}
              />
              <text fontSize="16" fill="#1e40af" fontWeight="600" transform="translate(0, 25)">
                <textPath href="#goalPath" startOffset="5%" dy="-20">
                  {primaryGoal || "Your Goal"}
                </textPath>
              </text>
            </>
          )}
        </svg>

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

      {/* Add animation keyframes here or in your global CSS */}
      <style jsx>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
