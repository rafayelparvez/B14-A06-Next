import WorkoutDetails from "@/components/shared/WorkoutDetails";

const WorkoutDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <WorkoutDetails id={id} />;
};

export default WorkoutDetailsPage;