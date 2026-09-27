import WorkoutDetail from "@/components/shared/WorkoutDetails";

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

const getWorkout = async (id: string): Promise<Workout> => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workout data");
  }

  const workouts: Workout[] = await response.json();

  const workout = workouts.find(
    (item) => String(item.id) === String(id)
  );

  if (!workout) {
    throw new Error("Workout not found");
  }

  return workout;
};

const WorkoutDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  return <WorkoutDetail workout={workout} />;
};

export default WorkoutDetailsPage;