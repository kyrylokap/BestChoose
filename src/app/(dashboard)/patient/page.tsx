"use client";

import PatientOverview from "@/components/dashboards/patient/PatientOverview";
import { mockAccounts } from "@/data/mock-accounts";
import { useRouter } from "next/navigation";

export default function PatientPage() {
  const router = useRouter();
  const user = mockAccounts[0];

  return (
    <main className="flex-1 w-full">
      <PatientOverview
        user={user}
        onLogout={() => router.replace('/login')}
      />
    </main>
  );
}
