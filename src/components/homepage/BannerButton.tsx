"use client";

import React from "react";

const BannerButton = () => {
  const handleBrowseWorkouts = () => {
    const workoutsSection =
      document.getElementById("workouts");

    if (workoutsSection) {
      workoutsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleBrowseWorkouts}
      className="mt-8 inline-flex items-center rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition-all duration-200 hover:scale-105 hover:bg-lime-300"
      style={{
        fontFamily: "var(--font-inter)",
      }}
    >
      Browse Workouts
    </button>
  );
};

export default BannerButton;

