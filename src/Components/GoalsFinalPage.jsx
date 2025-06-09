import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const iconVariants = {
  initial: { scale: 1, opacity: 1 },
  fadeOut: { scale: 0.5, opacity: 0, transition: { duration: 0.5 } },
  fadeIn: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

export default function FinalGoalsPage({ onNext, onBack }) {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheck(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Header with Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="p-2 rounded hover:bg-blue-200 transition"
          aria-label="Back"
        >
          <ArrowLeft className="text-blue-700" />
        </button>
      </div>

      {/* Icon morph and float upward inside flex layout */}
        <div className="h-32 flex items-center justify-center mb-6 relative">
        <AnimatePresence mode="wait">
            {!showCheck ? (
            <motion.div
                key="goals-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-6xl"
            >
                🎯
            </motion.div>
            ) : (
            <motion.div
                key="check-circle"
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center"
            >
                <span className="text-white text-3xl font-bold">✓</span>
            </motion.div>
            )}
        </AnimatePresence>
        </div>



      {/* Message text */}
      {showCheck && (
        <motion.p
          className="mb-12 max-w-xl text-xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          We've helped over{" "}
          <span className="font-bold text-blue-600">300,000 people</span> reach
          their healthier drinking goals. You're next!
        </motion.p>
      )}

      {/* Review */}
        {showCheck && (
        <motion.div
            className="mx-auto bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-12 max-w-lg"
            style={{ aspectRatio: "1 / 1", width: "300px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
        >
            <p className="text-lg italic text-gray-700 mb-6">
            "I feel a whole lot better, my family relationships have dramatically improved, and I'm much more accomplished overall."
            </p>
            <p className="text-base font-semibold text-blue-700 mb-2">— becca</p>
            <p className="text-sm text-blue-300 mb-2">Sunnyside member for 2 years</p>
            <div className="flex space-x-1 text-yellow-400 text-xl">
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
            ))}
            </div>
        </motion.div>
        )}
        {/* Next Button fixed to bottom-right */}
{showCheck && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4, duration: 0.6 }}
    className="absolute bottom-6 right-6"
  >
    <button
      onClick={onNext}
      className="p-4 rounded-full shadow text-white bg-blue-600 hover:bg-blue-700 transition"
      aria-label="Next"
    >
      <ArrowRight />
    </button>
  </motion.div>
)}

    </div>
  );
}
