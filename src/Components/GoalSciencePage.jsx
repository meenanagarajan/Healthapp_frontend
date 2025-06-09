import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const goalDescriptions = {
  "Overall Health": {
    paragraph: "Numerous scientific studies have linked lower alcohol consumption with improved overall health. Drinking less leads to short term benefits like improved sleep, better brain function, reduced stress and improved mental health, as well as reduced risk of long-term health conditions related to your heart, brain and liver.",
    reference: "Charlet, K., & Heinz, A. (2017). Harm reduction—a systematic review on effects of alcohol reduction on physical and mental symptoms",
  },
  "Slow Down Effects of Aging":{
    paragraph:"Research from Oxford University has demonstrated that reduction in alcohol consumption can benefit overall biological aging by decreasing cellular damage caused by alcohol.",
    reference: "A. Topiwala, et al. (2022). Molecular Psychology.",
  },
  "Lose Weight and Improve Fitness": {
    paragraph: "Alcohol is high in calories and sugar, and drinking often leads to poor food choices and overeating. Research indicates drinking less can improve metabolism and lead to healthier dietary habits, resulting in weight loss and improved physical health. As we reduce overall alcohol consumption together, you'll feel the impact!",
    reference: "Salma Rashid AlKalbani & Celine Murrin (2023). BMC Public Health.",
  },
  "Improve Sleep Quality": {
    paragraph:"Research indicates that reducing alcohol intake can significantly improve sleep quality. Alcohol disrupts the natural sleep cycle, particularly by affecting REM sleep, which is crucial for restorative rest. As you learn to drink more mindfully, this impact should decrease.",
    reference: "Colrain, I. M., Nicholas, C. L., & Baker, F. C. (2014). Alcohol and the sleeping brain. Handbook of Clinical Neurology.",
  },
  "Avoid Hangovers":{
    paragraph: "Drinking less alcohol overall and building healthier habits on drinking days reduce the risk of next day effects like dehydration, gastrointestinal disturbances, low blood sugar, and inflammation caused by acetaldehyde toxicity.",
    reference: "Scientific Report of the 2020 Dietary Guidelines Advisory Committee. Alcoholic beverages. U.S. Department of Health and Human Services.",
  },
  "Stop Blacking or Graying Out": {
    paragraph:"Drinking less alcohol overall and building healthier habits on drinking days helps to avoid rapid spikes in BAC and disruption of the brain's hippocampus associated with memory loss. As you learn to drink more mindfully, these occurrences should subside.",
    reference: "Hamin Lee, et al.. (2009). International Journal of Environmental Research and Public Health.",
  },
  "Save Money": {
    paragraph:
      "Research shows that reducing alcohol consumption not only improves health outcomes, but can also lead to substantial financial savings. A healthier relationship with alcohol should reduce direct spending on alcohol while also avoiding external costs like poor purchase decisions and increased cost of healthcare.",
    reference: "Victoria Porthé, et al. (2020). Journal of Community Health.",
  },
  "Find healthier Coping Strategies": {
    paragraph:"Research indicates that reducing alcohol consumption can lead to the adoption of healthier coping mechanisms. One study highlighted how stress can drive individuals to use alcohol as a maladaptive coping strategy. By reducing alcohol intake, you give yourself the opportunity to adopt more positive coping mechanisms such as seeking social support and engaging in prosocial behaviors.",
        reference: "Wittgens, C., et al. (2022). BMC Psychology.",
  },
  "Reduce Stress and Anxietyy": {
    paragraph:
      "Research indicates that reducing alcohol consumption can reduce stress-related symptoms. Many turn to alcohol to reduce stress and anxiety, but alcohol itself can act as a stressor, only making things worse. As you learn to drink more mindfully, your mood should stabilize as alcohol-induced stressors are removed.", 
      reference: "Wittgens, C., et al. (2022). BMC Psychology.",
  },
  "Improve Relationships": {
    paragraph:
      "Research indicates that reducing alcohol consumption is linked to improved mental health, which in turn enhances relationship quality. Lower alcohol consumption reduces stress and anxiety, leading to better emotional regulation and healthier interactions with others. This improvement in mental health supports stronger and more stable relationships.", 
      reference: "Wilson, I.M., et al. (2014). BMC Public Health.",
  },
};

const icons = [
  { name: "Goals", icon: "🎯" },
  { name: "Habits", icon: "🔄" },
  { name: "About", icon: "👤" },
  { name: "Plan", icon: "📋" },
  { name: "Start", icon: "🚀" },
];

export default function GoalSciencePage({ onBack, onNext }) {
  const [goal, setGoal] = useState("Overall Health");
  const [description, setDescription] = useState(goalDescriptions["Overall Health"]);

  const mapGoalToDescription = (goal) => {
    const goalTodesc = {
      "Improve health and Wellness": "Overall Health",
      "Slow Down Effects of Aging": "Slow Down Effects of Aging",
      "Lose Weight and Improve Fitness": "Lose Weight and Improve Fitness",
      "Improve Sleep Quality": "Improve Sleep Quality",
      "Avoid Hangovers": "Avoid Hangovers",
      "Stop Blacking or Graying Out": "Stop Blacking or Graying Out",
      "Save Money": "Save Money",
      "Find healthier Coping Strategies": "Find healthier Coping Strategies",
      "Reduce Stress and Anxietyy": "Reduce Stress and Anxietyy",
      "Improve Relationships": "Improve Relationships",
    };
    return goalTodesc[goal] || "Overall Health";
  };
  
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await fetch("https://healthapp-backend-i5i6.onrender.com/api/user-selections");
        const data = await res.json();
        if (data.primaryGoal) {
          const mappedGoal = mapGoalToDescription(data.primaryGoal);
          setGoal(mappedGoal);
          setDescription(goalDescriptions[mappedGoal] || goalDescriptions["Overall Health"]);
        }
      } catch (err) {
        console.error("Failed to load goal:", err);
      }
    };
    fetchGoal();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl py-4 px-6 flex justify-between items-center">
        <button onClick={onBack} className="p-2 hover:bg-blue-200 rounded">
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">The Goals</h1>
        <div style={{ width: 40 }} />
      </div>

      {/* Main Content */}
      <div className="relative flex justify-center items-center w-full mt-4">
        {/* White Card */}
        <div className="bg-white rounded-3xl shadow-md w-11/12 md:w-3/4 max-w-3xl px-6 py-8 relative z-10 overflow-hidden flex-grow">
        
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.15 }}
            transition={{ duration: 1 }}
            className="absolute left-[-90px] w-96 h-96 bg-blue-300 rounded-full z-0"
            style={{ top: '120px' }} // moved lower
            />


          {/* Progress Icons */}
          <div className="flex justify-between items-center mb-6 relative z-10">
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

          {/* Text Content (slides in from right) */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="text-base text-gray-800 mb-2">
                The Science
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              How drinking less improves <span className="text-blue-600">{goal}</span>
            </h2>
            <p className="text-gray-700 text-lg mb-64">
            {description.paragraph}
            </p>
            <p className="text-sm text-gray-500 italic mt-4">
            {description.reference}
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={onNext}
                className="p-4 rounded-full shadow text-white bg-blue-400 hover:bg-blue-500 transition"
              >
                <ArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
