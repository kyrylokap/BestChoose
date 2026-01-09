"use client";

import PatientHistory from "@/components/dashboards/patient/PatientHistory"; 
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div className="flex-1 w-full">
      <PatientHistory 
        onBack={() => router.back()} 
      />
    </div>
  );
}