import PlanContent from "./PlanContent";

const MyPlan = () => {
  return (
    <section className="min-h-screen w-full bg-[#0C0D10] px-5 py-10">
      <div className="container mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-white">
          My Plan
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Client Content */}
        <PlanContent />
      </div>
    </section>
  );
};

export default MyPlan;