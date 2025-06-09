import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import IntroAnimation from "./Components/IntroAnimation";
import GoalsPage1 from "./Components/GoalsPage1";
import GoalsPage2 from "./Components/GoalsPage2";
import FocusGoalPage from "./Components/FocusGoalPage";
import GoalSciencePage from "./Components/GoalSciencePage";
import GoalListPage from "./Components/GoalListPage";
import IdealOutcomePage from "./Components/IdealOutcomePage";
import PlanSetPage from "./Components/PlanSetPage";
import GoalsFinalPage from "./Components/GoalsFinalPage";
import HabitsIntroPage from "./Components/HabitsIntroPage";
import HabitsDetailPage from "./Components/HabitsDetailPage";
import DrinksPerDayPage from "./Components/DrinksPerDayPage";
import WeeklySummaryPage from "./Components/WeeklySummaryPage";
import SpendingPerDrinkPage from "./Components/SpendingPerDrinkPage";
import CalculateSpendingPage from "./Components/CalculateSpendingPage";
import AlcoholEffectsPage from "./Components/AlcoholEffectsPage";
import AlcoholConcernPage from "./Components/AlcoholConcernPage";
import AlcoholImprovementPage from "./Components/AlcoholImprovementPage";
import WeeklyReductionPage from "./Components/WeeklyReductionPage";
import HabitsFinalPage from "./Components/HabitsFinalPage.jsx";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const [goalsSelections, setGoalsSelections] = useState([]);
  const [habitsSelections, setHabitsSelections] = useState([]);
  const [primaryGoal, setPrimaryGoal] = useState(null);

  const [drinksPerDay, setDrinksPerDay] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [spendPerDrink, setSpendPerDrink] = useState(8);


  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep === 0 && (
        <motion.div key="intro" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <IntroAnimation onComplete={() => setCurrentStep(1)} />
        </motion.div>
      )}

      {currentStep === 1 && (
        <motion.div key="goals1" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <GoalsPage1 selected={goalsSelections} setSelected={setGoalsSelections} onBack={() => setCurrentStep(0)} onNext={() => setCurrentStep(2)} />
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div key="goals2" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <GoalsPage2 selectedGoals={goalsSelections} primaryGoal={primaryGoal} onBack={() => setCurrentStep(1)} onNext={(goal) => { setPrimaryGoal(goal); setCurrentStep(3); }} />
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div key="focusGoal" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <FocusGoalPage selectedGoals={goalsSelections} primaryGoal={primaryGoal} onBack={() => setCurrentStep(2)} onNext={(goal) => { setPrimaryGoal(goal); setCurrentStep(4); }} />
        </motion.div>
      )}

      {currentStep === 4 && (
        <motion.div key="goalScience" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <GoalSciencePage selectedGoals={goalsSelections} primaryGoal={primaryGoal} onBack={() => setCurrentStep(3)} onNext={(goal) => { setPrimaryGoal(goal); setCurrentStep(5); }} />
        </motion.div>
      )}

      {currentStep === 5 && (
        <motion.div key="goalList" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <GoalListPage selectedGoals={goalsSelections} primaryGoal={primaryGoal} onBack={() => setCurrentStep(4)} onNext={(goal) => { setPrimaryGoal(goal); setCurrentStep(6); }} />
        </motion.div>
      )}

      {currentStep === 6 && (
        <motion.div key="idealOutcome" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <IdealOutcomePage selectedGoals={goalsSelections} primaryGoal={primaryGoal} onBack={() => setCurrentStep(5)} onNext={() => setCurrentStep(7)} />
        </motion.div>
      )}

      {currentStep === 7 && (
        <motion.div key="planSet" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <PlanSetPage selectedGoals={goalsSelections} primaryGoal={primaryGoal} onBack={() => setCurrentStep(6)} onNext={() => setCurrentStep(8)} />
        </motion.div>
      )}

      {currentStep === 8 && (
        <motion.div key="goalsFinal" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <GoalsFinalPage selectedGoals={goalsSelections} primaryGoal={primaryGoal} onBack={() => setCurrentStep(7)} onNext={() => setCurrentStep(9)} />
        </motion.div>
      )}

      {currentStep === 9 && (
        <motion.div key="habitsIntro" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <HabitsIntroPage onBack={() => setCurrentStep(8)} onNext={() => setCurrentStep(10)} />
        </motion.div>
      )}

      {currentStep === 10 && (
        <motion.div key="habitsDetail" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <HabitsDetailPage onBack={() => setCurrentStep(9)} onNext={() => setCurrentStep(11)} />
        </motion.div>
      )}

      {currentStep === 11 && (
        <motion.div key="drinksPerDay" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <DrinksPerDayPage
            drinksPerDay={drinksPerDay}
            setDrinksPerDay={setDrinksPerDay}
            onBack={() => setCurrentStep(10)}
            onNext={() => setCurrentStep(12)}
          />
        </motion.div>
      )}

      {currentStep === 12 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <WeeklySummaryPage
            drinksPerDay={drinksPerDay}
            onBack={() => setCurrentStep(11)}
            onNext={() => setCurrentStep(13)}
          />
        </motion.div>
      )}
      {currentStep === 13 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <SpendingPerDrinkPage
            spendPerDrink={spendPerDrink}
            setSpendPerDrink={setSpendPerDrink}
            onBack={() => setCurrentStep(12)}
            onNext={() => setCurrentStep(14)}
          />
        </motion.div>
      )}
      {currentStep === 14 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <CalculateSpendingPage
            onBack={() => setCurrentStep(13)}
            onNext={() => setCurrentStep(15)}
          />
        </motion.div>
      )}
      {currentStep === 15 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <AlcoholEffectsPage
            onBack={() => setCurrentStep(14)}
            onNext={() => setCurrentStep(16)}
          />
        </motion.div>
      )}
      {currentStep === 16 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <AlcoholConcernPage
            onBack={() => setCurrentStep(15)}
            onNext={() => setCurrentStep(17)}
          />
        </motion.div>
      )}
      {currentStep === 17 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <AlcoholImprovementPage
            onBack={() => setCurrentStep(16)}
            onNext={() => setCurrentStep(18)}
          />
        </motion.div>
      )}
      {currentStep === 18 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <WeeklyReductionPage
            onBack={() => setCurrentStep(17)}
            onNext={() => setCurrentStep(19)}
          />
        </motion.div>
      )}
      {currentStep === 19 && (
        <motion.div key="weeklySummary" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} style={{ position: "absolute", width: "100%" }}>
          <HabitsFinalPage
            onBack={() => setCurrentStep(18)}
            onNext={() => setCurrentStep(20)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
