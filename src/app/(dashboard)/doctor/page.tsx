import DoctorOverview from "@/components/dashboards/doctor/DoctorOverview";
import { getAuthenticatedUser } from "@/lib/services/auth-service";
import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export type DoctorAppointment = {
    id: string;
    time: string;
    duration: string;
    type: string;
    patientName: string;
    symptoms: string;
    hasAiReport: boolean;
};


export default async function DoctorPage() {
    const supabase = await createClient();

    const user = await getAuthenticatedUser();

    const [todayCount, patientsCount, aiAppointments, todaySchedule] = await Promise.all([
        getTodayAppointmentsCount(user.id, supabase),
        getCountPatients(user.id, supabase),
        getAppointmentsWithAI(user.id, supabase),
        getDoctorTodayAppointments(user.id, supabase)
    ]);

    return (
        <main className="flex-1 w-full">
            <DoctorOverview
                user={user}
                stats={{
                    todayAppointments: todayCount,
                    totalPatients: patientsCount,
                    aiReports: aiAppointments
                }}
                schedule={todaySchedule}
            />
        </main>
    );
}

const getTodayAppointmentsCount = async (doctorId: string, supabase: SupabaseClient) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { count, error } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('doctor_id', doctorId)
        .gte('scheduled_time', todayStart.toISOString())
        .lte('scheduled_time', todayEnd.toISOString());

    if (error) console.error('Error today appointments:', error);
    return count ?? 0;
}

const getCountPatients = async (doctorId: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase
        .rpc('count_unique_patients', { doc_id: doctorId });

    if (error) console.error('Error AI appointments:', error);
    return (data as number) ?? 0;
}


const getAppointmentsWithAI = async (doctorId: string, supabase: SupabaseClient) => {
    const { count, error } = await supabase
        .from('appointments')
        .select('reports!inner(id)', { count: 'exact', head: true })
        .eq('doctor_id', doctorId)
        .not('reports.ai_suggestion', 'is', null);

    if (error) console.error('Error counting patients:', error);
    return count ?? 0;
}



export async function getDoctorTodayAppointments(
    doctorId: string,
    supabase: SupabaseClient
): Promise<DoctorAppointment[]> {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
        .from('appointments')
        .select(`
      id,
      scheduled_time,
      duration,
      visit_type,
      symptoms, 
      
      profiles!patient_id (
        first_name,
        last_name
      ),
      
      reports (
        ai_suggestion,
        ai_vision_analysis
      )
    `)
        .eq('doctor_id', doctorId)
        .gte('scheduled_time', todayStart.toISOString())
        .lte('scheduled_time', todayEnd.toISOString())
        .order('scheduled_time', { ascending: true });

    if (error) {
        console.error('Błąd pobierania wizyt:', error);
        return [];
    }

    return data.map(formatAppointment);
}


const formatAppointment = (item: any): DoctorAppointment => {
    const hasAiReport = !!(
        item.reports &&
        (item.reports.ai_suggestion || item.reports.ai_vision_analysis)
    );

    const patient = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;

    return {
        id: item.id,
        time: item.scheduled_time,
        duration: item.duration,
        type: item.visit_type,
        patientName: `${patient.first_name} ${patient.last_name}`,
        symptoms: item.symptoms,
        hasAiReport: hasAiReport,
    };
}