"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  X,
} from "lucide-react";

import type { PlanItem } from "@/context/WorkoutContext";

import {
  notifyRemovedFromPlan,
  notifyRemovedFromSaved,
} from "@/components/ui/toast";

type PlanCardProps = {
  item: PlanItem;
  showRemove?: boolean;
  onRemove?: (id: PlanItem["id"]) => void;
  removeType?: "plan" | "saved";
};

const PlanCard = ({
  item,
  showRemove = false,
  onRemove,
  removeType = "plan",
}: PlanCardProps) => {
  const handleRemove = () => {
    if (!onRemove) return;

    onRemove(item.id);

    if (removeType === "plan") {
      notifyRemovedFromPlan();
    } else {
      notifyRemovedFromSaved();
    }
  };

  return (
    <div className="border-b border-white/10 px-4 py-4 last:border-b-0 sm:px-5">

      {/* Main Row */}
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">

        {/* Image */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 64px, 80px"
            className="object-cover"
          />
        </div>

        {/* Workout Info */}
        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-bold uppercase text-white sm:text-base">
            {item.name}
          </h3>

          <p className="mt-1 truncate text-xs text-gray-400 sm:text-sm">
            {item.equipment}
          </p>

          {/* Mobile Stats */}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 sm:hidden">

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
        </div>

        {/* Remove Button */}
        {showRemove && onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-white/10 hover:text-white sm:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Desktop Stats */}
        <div className="hidden items-center gap-5 text-xs text-gray-300 sm:flex">

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="h-4 w-4 text-lime-400" />
            {item.duration} min
          </span>

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Flame className="h-4 w-4 text-lime-400" />
            {item.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Star className="h-4 w-4 fill-lime-400 text-lime-400" />
            {item.rating}
          </span>

        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">

          <Link
            href={`/workouts/${item.id}`}
            className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-lime-400 hover:text-lime-400 sm:px-4"
          >
            View Details
          </Link>

          {showRemove && onRemove && (
            <button
              type="button"
              onClick={handleRemove}
              aria-label={`Remove ${item.name}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}

        </div>
      </div>

      {/* Mobile Actions */}
      <div className="mt-3 flex items-center gap-2 pl-[76px] sm:hidden">

        <Link
          href={`/workouts/${item.id}`}
          className="flex-1 rounded-full border border-white/10 px-4 py-2 text-center text-xs font-semibold text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default PlanCard;