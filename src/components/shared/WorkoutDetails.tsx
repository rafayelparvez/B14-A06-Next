"use client";

import Image from "next/image";
import Link from "next/link";
import WorkoutContext, {
  type PlanItem,
} from "@/context/WorkoutContext";

type Workout = {
  id: number | string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  description?: string;
  instructions?: string[];
};

type WorkoutDetailProps = {
  workout: Workout;
};

const WorkoutDetail = ({ workout }: WorkoutDetailProps) => {
  const {
    plan,
    saved,
    addToPlan,
    toggleSaved,
    isPlanFull,
    hydrated,
  } = WorkoutContext();

  const isInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const isSaved = saved.some(
    (item) => item.id === workout.id
  );

  const planItem: PlanItem = {
    id: workout.id,
    name: workout.name,
    image: workout.image,
    muscleGroups: workout.muscleGroups,
    equipment: workout.equipment,
    duration: workout.duration,
    caloriesBurned: workout.caloriesBurned,
    rating: workout.rating,
  };

  const handleAddToPlan = () => {
    if (!hydrated || isInPlan || isPlanFull) return;

    addToPlan(planItem);
  };

  const handleSave = () => {
    if (!hydrated) return;

    toggleSaved(planItem);
  };

  return (
    <section className="w-full bg-[#0C0D10] px-5 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Title */}
            <h1
              className="text-4xl font-normal uppercase leading-tight tracking-wide text-lime-400 sm:text-5xl"
              style={{
                fontFamily: "var(--font-oswald)",
              }}
            >
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 text-[15px] leading-relaxed text-gray-400">
              {workout.description ||
                "A powerful exercise designed to build strength and improve overall performance."}
            </p>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-lime-400 px-4 py-1.5 text-xs font-bold uppercase text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#15171C]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-sm font-medium uppercase text-lime-400">
                  Equipment
                </span>

                <span className="text-sm text-white">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-sm font-medium uppercase text-lime-400">
                  Duration
                </span>

                <span className="text-sm text-white">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-sm font-medium uppercase text-lime-400">
                  Calories
                </span>

                <span className="text-sm text-white">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-medium uppercase text-lime-400">
                  Rating
                </span>

                <span className="text-sm text-white">
                  ★ {workout.rating}
                </span>
              </div>
            </div>

            {/* Instructions */}
            {workout.instructions &&
              workout.instructions.length > 0 && (
                <div className="mt-7">
                  <h2
                    className="text-2xl font-normal uppercase tracking-wide text-white"
                    style={{
                      fontFamily: "var(--font-oswald)",
                    }}
                  >
                    Instructions
                  </h2>

                  <ol className="mt-4 flex flex-col gap-3">
                    {workout.instructions.map(
                      (step, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm leading-relaxed text-gray-300"
                        >
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                            {index + 1}
                          </span>

                          <span>{step}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>
              )}

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToPlan}
                disabled={
                  !hydrated ||
                  isInPlan ||
                  isPlanFull
                }
                className={`rounded-full px-6 py-3 text-sm font-bold transition ${
                  isInPlan
                    ? "cursor-not-allowed bg-white/10 text-gray-400"
                    : isPlanFull
                      ? "cursor-not-allowed bg-white/10 text-gray-500"
                      : "bg-lime-400 text-black hover:bg-lime-300"
                }`}
              >
                {isInPlan
                  ? "Added to Plan"
                  : isPlanFull
                    ? "Plan Full"
                    : "Add to Today's Plan"}
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!hydrated}
                className={`rounded-full border px-6 py-3 text-sm font-bold transition ${
                  isSaved
                    ? "border-lime-400 bg-lime-400/10 text-lime-400"
                    : "border-white/20 text-white hover:border-lime-400 hover:text-lime-400"
                }`}
              >
                {isSaved
                  ? "Saved"
                  : "Save for Later"}
              </button>
            </div>

            {/* Back */}
            <Link
              href="/"
              className="mt-6 text-sm text-gray-500 transition hover:text-lime-400"
            >
              ← Back to workout library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetail;