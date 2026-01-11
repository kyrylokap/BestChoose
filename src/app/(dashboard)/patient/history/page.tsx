import PatientReportHistory from "@/components/dashboards/patient/PatientHistory";
import { createClient } from "@/lib/supabase/server";

export default async function HistoryPage() {
  const reports = await getReports();

  return (
    <div className="flex-1 w-full">
      <PatientReportHistory
        reports={reports}
      />
    </div>
  );
}


export const getReports = async () => {
  const supabase = await createClient();

  const { data: reports, error } = await supabase
    .from('reports')
    .select(`
      id, 
      status,
      appointments (
        symptoms,
        scheduled_time
      )
    `)
    .order('scheduled_time', { referencedTable: 'appointments', ascending: false });

  if (error || !reports) {
    console.error('Error fetching raports:', error);
    return [];
  }

  return reports.map(formatReport);
};

export type ReportItem = {
  id: string;
  date: string;
  time: string
  symptoms: string;
  status: string;
}

const formatReport = (item: any): ReportItem => {
  const appointment = Array.isArray(item.appointments)
    ? item.appointments[0]
    : item.appointments;

  const dateObj = new Date(appointment?.scheduled_time);

  return {
    id: item.id,
    symptoms: appointment?.symptoms || 'No data on symptoms',
    date: dateObj.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }),
    time: dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: false
    }),
    status: item.status,
  };
};