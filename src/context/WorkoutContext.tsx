"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type PlanItem = {
  id: number | string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

export const PLAN_CAP = 5;

function readList(key: string): PlanItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);

    return raw ? (JSON.parse(raw) as PlanItem[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: PlanItem[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Ignore localStorage errors
  }
}

type PlanContextValue = {
  plan: PlanItem[];
  saved: PlanItem[];
  hydrated: boolean;
  isPlanFull: boolean;

  addToPlan: (item: PlanItem) => void;

  removeFromPlan: (id: PlanItem["id"]) => void;

  toggleSaved: (item: PlanItem) => void;

  removeFromSaved: (id: PlanItem["id"]) => void;
};

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);

  const [saved, setSaved] = useState<PlanItem[]>([]);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readList(PLAN_KEY));
    setSaved(readList(SAVED_KEY));
    setHydrated(true);
  }, []);

  // Add workout to today's plan
  const addToPlan = useCallback((item: PlanItem) => {
    setPlan((prev) => {
      if (prev.some((p) => p.id === item.id)) {
        return prev;
      }

      if (prev.length >= PLAN_CAP) {
        return prev;
      }

      const next = [...prev, item];

      writeList(PLAN_KEY, next);

      return next;
    });
  }, []);

  // Remove workout from today's plan
  const removeFromPlan = useCallback((id: PlanItem["id"]) => {
    setPlan((prev) => {
      const next = prev.filter((item) => item.id !== id);

      writeList(PLAN_KEY, next);

      return next;
    });
  }, []);

  // Save / Unsave workout
  const toggleSaved = useCallback((item: PlanItem) => {
    setSaved((prev) => {
      const exists = prev.some((p) => p.id === item.id);

      const next = exists
        ? prev.filter((p) => p.id !== item.id)
        : [...prev, item];

      writeList(SAVED_KEY, next);

      return next;
    });
  }, []);

  // Remove workout from Saved
  const removeFromSaved = useCallback((id: PlanItem["id"]) => {
    setSaved((prev) => {
      const next = prev.filter((item) => item.id !== id);

      writeList(SAVED_KEY, next);

      return next;
    });
  }, []);

  const isPlanFull = plan.length >= PLAN_CAP;

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        hydrated,
        isPlanFull,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

const WorkoutContext = () => {
  const ctx = useContext(PlanContext);

  if (!ctx) {
    throw new Error("WorkoutContext must be used inside a <PlanProvider>");
  }

  return ctx;
};

export default WorkoutContext;
