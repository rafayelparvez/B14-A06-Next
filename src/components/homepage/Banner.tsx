import React from "react";
import Image from "next/image";
import banner from "@/assets/banner.png";
import BrowseWorkouts from "./BrowseWorkouts";
import BannerButton from "./BannerButton";

const Banner = () => {
  return (
    <section className="w-full bg-[#0C0D10] px-6 py-6">
      <div className="container mx-auto overflow-hidden rounded-3xl bg-[#181A1F] px-8 py-10 md:px-14 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left Content */}
          <div>
            <p
              className="text-sm font-medium uppercase tracking-[0.12em] text-lime-400"
              style={{
                fontFamily: "var(--font-oswald)",
              }}
            >
              Workout Library
            </p>

            <h1
              className="mt-4 text-4xl font-normal uppercase leading-[1.15] tracking-[0.02em] text-white sm:text-5xl lg:text-[60px]"
              style={{
                fontFamily: "var(--font-oswald)",
              }}
            >
              Train With Intent. Log Every Set.
            </h1>

            <p
              className="mt-6 max-w-md text-base leading-relaxed text-gray-400"
              style={{
                fontFamily: "var(--font-inter)",
              }}
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Browse Workouts */}
            <BannerButton />
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <Image
              src={banner}
              width={500}
              height={400}
              alt="Workout equipment"
              className="h-auto w-full max-w-md object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;