import PatientOverview from "@/components/dashboards/patient/PatientOverview";
import { getAppointments } from "@/lib/services/appointment-service";
import { getAuthenticatedUser } from "@/lib/services/auth-service";


export default async function PatientPage() {
  const user = await getAuthenticatedUser();
  const upcomingAppointments = await getAppointments('upcoming');

  return (
    <main className="flex-1 w-full">
      <PatientOverview
        upcomingAppointments={upcomingAppointments}
        user={user}
      />
    </main>
  );
}
