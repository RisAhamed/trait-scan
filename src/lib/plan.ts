
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Plan = 'free' | 'pro';

interface PlanContextType {
  plan: Plan;
  setPlan: (plan: Plan) => void;
  isPro: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const [plan, setPlanState] = useState<Plan>('free');

  useEffect(() => {
    const savedPlan = localStorage.getItem('user_plan') as Plan;
    if (savedPlan === 'free' || savedPlan === 'pro') {
      setPlanState(savedPlan);
    }
  }, []);

  const setPlan = (newPlan: Plan) => {
    setPlanState(newPlan);
    localStorage.setItem('user_plan', newPlan);
  };

  const isPro = plan === 'pro';

  return (
    <PlanContext.Provider value={{ plan, setPlan, isPro }}>
      {children}
    </PlanContext.Provider>
  );
};
