import PatientVisits from "@/components/dashboards/patient/PatientVisits";
import { getAppointments } from "@/lib/services/appointment-service";

export default async function VisitsPage() {
  const appointments = await getAppointments('all');

  return (
    <div className="flex-1 w-full">
      <PatientVisits
        appointments={appointments}
      />
    </div>
  );
}