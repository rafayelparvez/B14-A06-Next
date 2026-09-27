"use client";

import React, {
  useMemo,
  useState,
} from "react";
import Link from "next/link";

import PlanCard from "@/components/shared/PlanCard";

import WorkoutContext, {
  PLAN_CAP,
} from "@/context/WorkoutContext";

type Tab = "plan" | "saved";

type SortKey =
  | "duration"
  | "caloriesBurned"
  | "rating"
  | "name";

const MyPlan = () => {
  const {
    plan,
    saved,
    hydrated,
    removeFromPlan,
    removeFromSaved,
  } = WorkoutContext();

  const [tab, setTab] =
    useState<Tab>("plan");

  const [sortKey, setSortKey] =
    useState<SortKey>("duration");

  // Active list changes when tab changes
  const activeList =
    tab === "plan"
      ? plan
      : saved;

  // Sort active list
  const sortedList = useMemo(() => {
    const list = [...activeList];

    list.sort((a, b) => {
      if (sortKey === "name") {
        return a.name.localeCompare(
          b.name
        );
      }

      if (sortKey === "rating") {
        return b.rating - a.rating;
      }

      return (
        (a[sortKey] as number) -
        (b[sortKey] as number)
      );
    });

    return list;
  }, [activeList, sortKey]);

  // Stats change according to active tab
  const totals = useMemo(() => {
    return activeList.reduce(
      (acc, item) => {
        acc.exercises += 1;

        acc.minutes +=
          item.duration || 0;

        acc.calories +=
          item.caloriesBurned || 0;

        return acc;
      },
      {
        exercises: 0,
        minutes: 0,
        calories: 0,
      }
    );
  }, [activeList]);

  return (
    <section className="min-h-screen w-full bg-[#0C0D10] px-5 py-10">
      <div className="container mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-white">
          My Plan
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Cap of five lifts for today.
          Finish them, then load more.
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#15171C]">

          {/* Exercises */}
          <div className="px-3 py-5 sm:px-6">
            <p className="text-xs text-gray-400">
              Exercises
            </p>

            <p className="mt-1 text-2xl font-extrabold text-lime-400">
              {totals.exercises}
            </p>
          </div>

          {/* Minutes */}
          <div className="px-3 py-5 sm:px-6">
            <p className="text-xs text-gray-400">
              Minutes
            </p>

            <p className="mt-1 text-2xl font-extrabold text-white">
              {totals.minutes}
            </p>
          </div>

          {/* Calories */}
          <div className="px-3 py-5 sm:px-6">
            <p className="text-xs text-gray-400">
              Calories
            </p>

            <p className="mt-1 text-2xl font-extrabold text-white">
              {totals.calories}
            </p>
          </div>

        </div>

        {/* Tabs + Sort */}
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">

          {/* Tabs */}
          <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">

            {/* Today's Plan */}
            <button
              type="button"
              onClick={() =>
                setTab("plan")
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === "plan"
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={() =>
                setTab("saved")
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === "saved"
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">

            <label
              htmlFor="sort"
              className="text-sm text-gray-400"
            >
              Sort:
            </label>

            <select
              id="sort"
              value={sortKey}
              onChange={(e) =>
                setSortKey(
                  e.target.value as SortKey
                )
              }
              className="rounded-full border border-white/10 bg-[#15171C] px-4 py-2 text-sm text-white outline-none focus:border-lime-400"
            >
              <option value="duration">
                Duration
              </option>

              <option value="caloriesBurned">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>

              <option value="name">
                Name
              </option>
            </select>

          </div>

        </div>

        {/* Workout List */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#15171C]">

          {/* Loading */}
          {!hydrated ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-gray-400">
                Loading...
              </p>
            </div>
          ) : sortedList.length === 0 ? (

            /* Empty State */
            <div className="px-6 py-16 text-center">

              <h3 className="text-lg font-bold uppercase text-white">
                {tab === "plan"
                  ? "Your plan is empty"
                  : "No saved workouts"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                {tab === "plan"
                  ? "Browse the workout library and add exercises to today's plan."
                  : "Save workouts from the library and they will appear here."}
              </p>

              <Link
                href="/"
                className="mt-5 inline-block rounded-full bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300"
              >
                Browse Workouts
              </Link>

            </div>

          ) : (

            /* Workout Cards */
            sortedList.map((item) => (
              <PlanCard
                key={item.id}
                item={item}

                // Remove button for both tabs
                showRemove={true}

                // Remove from the correct list
                onRemove={
                  tab === "plan"
                    ? removeFromPlan
                    : removeFromSaved
                }
              />
            ))

          )}

        </div>

        {/* Plan Limit */}
        {tab === "plan" &&
          plan.length >= PLAN_CAP && (
            <p className="mt-3 text-center text-xs text-gray-500">
              You&apos;ve hit today&apos;s cap of{" "}
              {PLAN_CAP} lifts.
            </p>
          )}

      </div>
    </section>
  );
};

export default MyPlan;
