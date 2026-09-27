import React from "react";

type Props = {
  id: string;
};

const WorkoutDetails = ({ id }: Props) => {
  return (
    <section className="min-h-screen w-full bg-[#0C0D10] px-5 py-10">
      <div className="container mx-auto">
        <div className="rounded-2xl border border-white/10 bg-[#181A1F] p-6">
          <p className="text-sm text-gray-400">
            Workout ID: {id}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold uppercase text-white">
            Workout Details
          </h1>

          <p className="mt-3 text-gray-400">
            Workout information will appear here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetails;