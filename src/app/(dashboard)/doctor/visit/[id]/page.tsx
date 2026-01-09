"use client";

import DoctorVisit from "@/components/dashboards/doctor/DoctorVisit";
import { useParams } from "next/navigation";

export default function VisitPage() {
  const params = useParams();
  const visitId = params.id as string;
  
  return (
    <main className="flex-1 w-full">
      <DoctorVisit visitId={visitId} />
    </main>
  );
}