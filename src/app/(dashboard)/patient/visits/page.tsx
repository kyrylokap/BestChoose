"use client";

import PatientVisits from "@/components/dashboards/patient/PatientVisits"; 
import { useRouter } from "next/navigation";

export default function VisitsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 w-full">
      <PatientVisits 
        onBack={() => router.back()} 
      />
    </div>
  );
}