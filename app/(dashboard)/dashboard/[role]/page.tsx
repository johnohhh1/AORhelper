import { notFound } from "next/navigation";

interface DashboardPageProps {
  params: {
    role: string;
  };
}

const validRoles = ["culinary", "hospitality", "togo_bar", "gm"];

export default function DashboardPage({ params }: DashboardPageProps) {
  const { role } = params;

  if (!validRoles.includes(role)) {
    notFound();
  }

  const roleLabels = {
    culinary: "Culinary Leader",
    hospitality: "Hospitality Leader",
    togo_bar: "To-Go/Bar Leader",
    gm: "General Manager",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {roleLabels[role as keyof typeof roleLabels]} Dashboard
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Today's Priorities Card */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Today&apos;s Priorities
          </h2>
          <p className="text-gray-600">
            No tasks due today. Your dashboard will show tasks, metrics, and
            team information here.
          </p>
        </div>

        {/* Metrics Snapshot */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Key Metrics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-sm text-gray-600">Metric 1</p>
              <p className="text-2xl font-semibold text-gray-900">--</p>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-sm text-gray-600">Metric 2</p>
              <p className="text-2xl font-semibold text-gray-900">--</p>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-sm text-gray-600">Metric 3</p>
              <p className="text-2xl font-semibold text-gray-900">--</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Enter Metrics
            </button>
            <button className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              View Tasks
            </button>
            <button className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              Team Performance
            </button>
            <button className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              Schedule Tracker
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
