
import PatientOverview from "@/components/dashboards/patient/PatientOverview";
import { mockAccounts } from "@/data/mock-accounts";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PatientPage() {
  const user = mockAccounts[0];

  return (
    <main className="flex-1 w-full">
      <PatientOverview
        user={user}
      />
    </main>
  );
}
