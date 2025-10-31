"use client";

import { useRouter } from "next/navigation";
import { UserRole } from "@/types";

const roles: { value: UserRole; label: string; description: string }[] = [
  {
    value: "CULINARY",
    label: "Culinary Leader",
    description: "Manage BOH operations, food quality, and kitchen team",
  },
  {
    value: "HOSPITALITY",
    label: "Hospitality Leader",
    description: "Oversee FOH service, guest experience, and dining room",
  },
  {
    value: "TOGO_BAR",
    label: "To-Go/Bar Leader",
    description: "Handle to-go orders, bar service, and carryout operations",
  },
  {
    value: "GM",
    label: "General Manager",
    description: "View all areas and overall restaurant performance",
  },
];

export default function RoleSelectPage() {
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    // TODO: Save selected role to session/context
    // For now, just redirect to dashboard
    router.push(`/dashboard/${role.toLowerCase()}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Select Your Role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your area of ownership to continue
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => handleRoleSelect(role.value)}
              className="flex flex-col rounded-lg border-2 border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {role.label}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{role.description}</p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
