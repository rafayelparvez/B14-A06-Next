"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, X } from "lucide-react";
import WorkoutContext from "@/context/WorkoutContext";
import {
  PLAN_CAP,
  type PlanItem,
} from "@/context/WorkoutContext";

type SortKey =
  | "duration"
  | "caloriesBurned"
  | "rating"
  | "name";

type Tab = "plan" | "saved";

const PlanContent = () => {
  const {
    plan,
    saved,
    removeFromPlan,
    hydrated,
  } = WorkoutContext();

  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] =
    useState<SortKey>("duration");

  const activeList =
    tab === "plan" ? plan : saved;

  // Sort
  const sortedList = useMemo(() => {
    const list = [...activeList];

    list.sort((a, b) => {
      if (sortKey === "name") {
        return a.name.localeCompare(b.name);
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

  // Plan totals
  const totals = useMemo(
    () =>
      plan.reduce(
        (acc, item) => ({
          exercises: acc.exercises + 1,
          minutes:
            acc.minutes + (item.duration || 0),
          calories:
            acc.calories +
            (item.caloriesBurned || 0),
        }),
        {
          exercises: 0,
          minutes: 0,
          calories: 0,
        }
      ),
    [plan]
  );

  return (
    <>
      {/* Stats Bar */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#15171C]">
        <div className="px-3 py-5 sm:px-6">
          <p className="text-xs text-gray-400">
            Exercises
          </p>

          <p className="mt-1 text-2xl font-extrabold text-lime-400">
            {totals.exercises}
          </p>
        </div>

        <div className="px-3 py-5 sm:px-6">
          <p className="text-xs text-gray-400">
            Minutes
          </p>

          <p className="mt-1 text-2xl font-extrabold text-white">
            {totals.minutes}
          </p>
        </div>

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
          <button
            type="button"
            onClick={() => setTab("plan")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === "plan"
                ? "bg-lime-400/10 text-lime-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setTab("saved")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === "saved"
                ? "bg-lime-400/10 text-lime-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort */}
        <div className="flex flex-col items-start gap-1">
          <label
            htmlFor="sortBy"
            className="text-sm font-semibold text-white"
          >
            Sort By
          </label>

          <select
            id="sortBy"
            value={sortKey}
            onChange={(e) =>
              setSortKey(
                e.target.value as SortKey
              )
            }
            className="min-w-[180px] appearance-none rounded-full border border-white/15 bg-[#15171C] px-4 py-2 text-sm text-white outline-none focus:border-lime-400"
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

      {/* Content */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#15171C]">
        {!hydrated ? (
          <div className="flex items-center justify-center px-6 py-16">
            <p className="text-sm text-gray-400">
              Loading...
            </p>
          </div>
        ) : sortedList.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <ul className="divide-y divide-white/10">
            {sortedList.map((item) => (
              <PlanRow
                key={item.id}
                item={item}
                onRemove={
                  tab === "plan"
                    ? removeFromPlan
                    : undefined
                }
              />
            ))}
          </ul>
        )}
      </div>

      {/* Plan Cap */}
      {tab === "plan" &&
        plan.length >= PLAN_CAP && (
          <p className="mt-3 text-center text-xs text-gray-500">
            You&apos;ve hit today&apos;s cap of{" "}
            {PLAN_CAP} lifts. Finish one to add
            another.
          </p>
        )}
    </>
  );
};

const EmptyState = ({
  tab,
}: {
  tab: Tab;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-white">
        Nothing here yet
      </p>

      <p className="max-w-sm text-sm text-gray-400">
        {tab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save lifts from the library to find them here later."}
      </p>

      <Link
        href="/"
        className="mt-2 rounded-full bg-lime-400 px-6 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
      >
        Go to workouts
      </Link>
    </div>
  );
};

const PlanRow = ({
  item,
  onRemove,
}: {
  item: PlanItem;
  onRemove?: (id: PlanItem["id"]) => void;
}) => {
  return (
    <li className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5">
      {/* Image */}
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold uppercase text-white">
          {item.name}
        </p>

        <p className="truncate text-xs text-gray-400">
          {item.equipment}
        </p>
      </div>

      {/* Stats */}
      <div className="hidden items-center gap-4 text-xs text-gray-300 sm:flex">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-lime-400" />
          {item.duration} min
        </span>

        <span className="flex items-center gap-1">
          <Flame className="h-3.5 w-3.5 text-lime-400" />
          {item.caloriesBurned} kcal
        </span>

        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-lime-400 text-lime-400" />
          {item.rating}
        </span>
      </div>

      {/* Remove */}
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from plan`}
          className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </li>
  );
};

export default PlanContent;