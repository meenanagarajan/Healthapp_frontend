import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
const icons = [
  { name: "Goals", icon: "✓", completed: true },
  { name: "Habits", icon: "🔄", completed: false, active: true },
  { name: "About", icon: "👤", completed: false },
  { name: "Plan", icon: "📋", completed: false },
  { name: "Review", icon: "⭐", completed: false },
];
const days = [
  { short: "M", full: "Monday" },
  { short: "T", full: "Tuesday" },
  { short: "W", full: "Wednesday" },
  { short: "T", full: "Thursday" },
  { short: "F", full: "Friday" },
  { short: "S", full: "Saturday" },
  { short: "S", full: "Sunday" },
];

export default function DrinksPerDayPage({ drinksPerDay, setDrinksPerDay, onNext, onBack }) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  

  const currentDay = days[currentDayIndex];

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setDrinksPerDay((prev) => ({
        ...prev,
        [currentDay.full]: val === "" ? 0 : Number(val),  // <-- Changed here: "" => 0
      }));
    }
  };
  

  const goPrevDay = () => {
    if (currentDayIndex > 0) setCurrentDayIndex(currentDayIndex - 1);
  };

  const goNextDay = async () => {
    if (currentDayIndex < days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else {
      // Last day reached, submit and go to next page
      try {
        console.log("Sending drinks data:", drinksPerDay);

        await saveDrinksToBackend(drinksPerDay);
        onNext(); // trigger navigation
      } catch (err) {
        console.error("Error saving drinks data:", err);
      }
    }
  };

  async function saveDrinksToBackend(data) {
    const response = await fetch("https://healthapp-backend-i5i6.onrender.com/api/save-drinks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to save drinks data");
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

      {/* White card centered */}
      <div className="relative flex justify-center items-center w-full mt-4">
        {/* White Card */}
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
          {/* Question text */}
          <p className="text-center text-lg mb-2">
            On a typical{" "}
            <span className="font-bold text-purple-700">{currentDay.full}</span>
            ,<br />
            how many drinks do you usually have?
          </p>
          <p className="text-center text-sm mb-6">
            Enter <span className="font-semibold">“0”</span> if you don't usually
            drink on this day
          </p>

          {/* Number input */}
          <div className="w-full flex justify-center mb-6">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="text-center border border-gray-300 rounded-lg w-24 py-2 text-3xl font-semibold mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={drinksPerDay[currentDay.full]}
              onChange={handleInputChange}
              aria-label={`Number of drinks on ${currentDay.full}`}
            />
          </div>
          <div className="w-full flex justify-center mb-6">
          {/* Day selector with arrows */}
          <div className="flex items-center justify-between w-full max-w-md mb-8 px-4">
            {/* Left arrow */}
            <button
              onClick={goPrevDay}
              disabled={currentDayIndex === 0}
              className={`p-3 rounded-full transition ${
                currentDayIndex === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-purple-700 hover:bg-purple-200"
              }`}
              aria-label="Previous day"
            >
              <ArrowLeft size={24} />
            </button>

            {/* Days row */}
            <div className="flex justify-center space-x-4 select-none">
              {days.map((day, idx) => (
                <div
                  key={day.full}
                  className={`text-xl font-semibold ${
                    idx === currentDayIndex ? "text-purple-700" : "text-gray-400"
                  }`}
                >
                  {day.short}
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={goNextDay}
              className="p-3 rounded-full text-white bg-purple-700 hover:bg-purple-800 transition"
              aria-label={currentDayIndex === days.length - 1 ? "Finish" : "Next day"}
            >
              <ArrowRight size={24} />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
