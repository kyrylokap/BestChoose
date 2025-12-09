import { Account } from "@/types/account";
import { useState } from "react";
import DoctorOverview from "./DoctorOverview";
import DoctorVisit from "./DoctorVisit";

export type DoctorView = "overview" | "visit";


type DashboardProps = {
  user: Account;
  onLogout: () => void;
};

export default function DoctorDashboard({ user, onLogout }: DashboardProps) {
  const [view, setView] = useState<DoctorView>("overview");
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);


  return (
    <section className="w-full space-y-8">
      {
        view === "overview" && (
          <DoctorOverview
            user={user}
            onLogout={onLogout} onNavigate={setView}
            onVisitSelect={(id) => setSelectedVisitId(id)}
          />
        )
      }

      {
        view === "visit" && selectedVisitId && (
          <DoctorVisit
            user={user}
            visitId={selectedVisitId}
            onBack={() => setView("overview")} />
        )
      }
    </section>

  );
}