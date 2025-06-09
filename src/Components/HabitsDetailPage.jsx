import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = [
  { name: "Goals", icon: "✓", completed: true },
  { name: "Habits", icon: "🔄", completed: false, active: true },
  { name: "About", icon: "👤", completed: false },
  { name: "Plan", icon: "📋", completed: false },
  { name: "Review", icon: "⭐", completed: false },
];

const textVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 100 : -100,
    transition: { duration: 0.5 },
  }),
};

export default function HabitsDetailPage({ onNext, onBack }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const subtexts = [
    <>
      Try to be as realistic as possible with your answers. This is a{" "}
      <span className="font-bold text-purple-600">safe place</span> and HealthApp is entirely{" "}
      <span className="font-bold text-purple-600">judgment free</span>.
    </>,
    <>
      We'll step through each day together to get a sense of your current baseline, which we'll use as the starting point for your plan.
    </>,
  ];

  const handleNext = () => {
    if (step < subtexts.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      onNext?.();
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
          <p className="text-black-700 text-2xl">Take us through a {" "}
          <span className="font-bold text-purple-600">typical week of drinking</span> for you.</p>

          {/* Animated Subtext */}
          <div className="min-h-[72px] text-black-700 text-lg mt-2">
            <AnimatePresence custom={direction} mode="wait">
              <motion.p
                key={step}
                custom={direction}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mx-auto"
              >
                {subtexts[step]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Next button */}
          <div className="flex justify-end mt-6">
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
