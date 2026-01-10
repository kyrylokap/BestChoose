import { VisitCard } from "@/components/shared/VisitCard";
import { Appointment } from "@/lib/services/appointment-service";

type Props = {
  appointments: Appointment[];
  emptyMessage?: string;
};

export const AppointmentList = ({ 
  appointments, 
  emptyMessage = "You currently have no scheduled appointments" 
}: Props) => {
  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {appointments.map((appointment) => (
        <VisitCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};