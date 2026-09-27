import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

const WorkCard = ({ item }: any) => {
  if (!item) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181A1F] transition-all duration-200 hover:border-lime-400">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={item.image}
          alt={item.name || "Workout"}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Muscle Groups */}
        <div className="mb-4 flex flex-wrap gap-2">
          {item.muscleGroups?.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-xl font-extrabold uppercase text-white">
          {item.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-sm text-gray-400">
          {item.equipment}
        </p>

        {/* Info */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-lime-400" />
            {item.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-lime-400" />
            {item.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-lime-400 text-lime-400" />
            {item.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;