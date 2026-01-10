"use client"

import { AppointmentList } from "@/components/shared/AppointmentList";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Appointment } from "@/lib/services/appointment-service";
import { useRouter } from "next/navigation";

type Props = {
  appointments: Appointment[];
};

export default function PatientVisits({ appointments }: Props) {
  const router = useRouter();

  return (
    <section className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="My Appointments"
        subtitle="Upcoming and Scheduled Consultations"
        onBack={() => router.back()}
      />
      <div className="mt-4">
        <AppointmentList appointments={appointments} />
      </div>
    </section>
  );
}





