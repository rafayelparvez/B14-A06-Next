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
};

const PlanContext = createContext<PlanContextValue | undefined>(
  undefined
);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load plan and saved workouts from localStorage
  useEffect(() => {
    setPlan(readList(PLAN_KEY));
    setSaved(readList(SAVED_KEY));
    setHydrated(true);
  }, []);

  // Add workout to plan
  const addToPlan = useCallback((item: PlanItem) => {
    setPlan((prev) => {
      // Prevent duplicate workout
      if (prev.some((p) => p.id === item.id)) {
        return prev;
      }

      // Maximum 5 workouts
      if (prev.length >= PLAN_CAP) {
        return prev;
      }

      const next = [...prev, item];

      writeList(PLAN_KEY, next);

      return next;
    });
  }, []);

  // Remove workout from plan
  const removeFromPlan = useCallback(
    (id: PlanItem["id"]) => {
      setPlan((prev) => {
        const next = prev.filter((p) => p.id !== id);

        writeList(PLAN_KEY, next);

        return next;
      });
    },
    []
  );

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

  // Check whether plan has reached the limit
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
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

// Custom context hook
const WorkoutContext = () => {
  const ctx = useContext(PlanContext);

  if (!ctx) {
    throw new Error(
      "WorkoutContext must be used inside a <PlanProvider>"
    );
  }

  return ctx;
};

export default WorkoutContext;