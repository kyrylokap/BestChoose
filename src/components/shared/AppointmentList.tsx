import { VisitCard } from "@/components/shared/VisitCard";
import { Appointment, usePatient } from "@/hooks/usePatient";
import { useEffect, useState } from "react";
import { useSession } from "../hoc/AuthSessionProvider";

type Props = {
  appointmentsFilter: 'all' | 'upcoming';
};

export const AppointmentList = ({
  appointmentsFilter,
}: Props) => {
  const { session } = useSession();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { getAppointments } = usePatient(session?.user?.id);
  useEffect(() => {
    const loadData = async () => {
      const data = await getAppointments(appointmentsFilter);
      setAppointments(data);
    };

    loadData();
  }, [session, getAppointments]);

  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-500">
        {"You currently have no scheduled appointments"}
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