
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Plan = 'free' | 'pro';

interface PlanContextType {
  plan: Plan;
  setPlan: (plan: Plan) => void;
  isPro: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

interface PlanProviderProps {
  children: ReactNode;
}

export function PlanProvider({ children }: PlanProviderProps) {
  const [plan, setPlanState] = useState<Plan>('free');

  // Load plan from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('user_plan') as Plan;
    if (savedPlan && (savedPlan === 'free' || savedPlan === 'pro')) {
      setPlanState(savedPlan);
    }
  }, []);

  // Save plan to localStorage when it changes
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
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
