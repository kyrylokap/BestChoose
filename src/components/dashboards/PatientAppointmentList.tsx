import { useEffect, useState } from "react";
import { useSession } from "../hoc/AuthSessionProvider";
import { Appointment, useAppointment } from "@/hooks/useAppointments";
import { AppointmentCard } from "../shared/AppointmentCard";

type Props = {
    filter: 'all' | 'upcoming';
};

export const PatientAppointmentList = ({ filter }: Props) => {
    const { session } = useSession();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const { getAppointmentsDetails } = useAppointment(session?.user?.id);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            const data = await getAppointmentsDetails(filter, "patient");
            if (isMounted) setAppointments(data);
        };
        loadData();
        return () => { isMounted = false; };
    }, [getAppointmentsDetails, filter]);

    if (appointments.length === 0) {
        return (
            <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-500">
                You currently have no scheduled appointments.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {appointments.map((appt) => (
                <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                />
            ))}
        </div>
    );
};