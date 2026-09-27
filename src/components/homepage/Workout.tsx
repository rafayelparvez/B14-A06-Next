import React from "react";
import WorkCard from "../WorkCard";

const getWorkout = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workout data");
  }

  return response.json();
};

const Workout = async () => {
  const workoutData = await getWorkout();

  return (
    <section className="w-full bg-[#0C0D10] px-5 py-10">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white">
            The Library
          </h2>

          <p className="mt-2 inline-block px-2 py-1 text-sm text-gray-300">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workoutData?.map((item: any) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workout;