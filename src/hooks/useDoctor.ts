import { useCallback } from "react";
import { supabase } from "@/api/supabase";


export type DashboardStats = {
    todayAppointments: number;
    totalPatients: number;
    aiReports: number;
};

export type AppointmentCompletionData = {
    appointmentId: string;
    diagnosis: string;
    aiRating: 'accurate' | 'inaccurate' | null;
};



export const useDoctor = (userId: string | undefined) => {

    const getStats = useCallback(async (): Promise<DashboardStats | null> => {
        if (!userId) return null;

        try {
            const [todayCount, patientsCount, aiAppointments] =
                await Promise.all([
                    fetchTodayAppointmentsCount(userId),
                    fetchCountPatients(userId),
                    fetchAppointmentsWithAI(userId),
                ]);

            return {
                todayAppointments: todayCount,
                totalPatients: patientsCount,
                aiReports: aiAppointments,
            };
        } catch (error) {
            return null;
        }
    }, [userId]);

    const completeAppointment = useCallback(async (data: AppointmentCompletionData): Promise<boolean> => {
        try {
            await saveDoctorDiagnosis(data);
            return true;
        } catch (error) {
            return false;
        }
    }, []);


    return {
        getStats,
        completeAppointment,
    };
};

const getTodayRangeISO = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return {
        todayStartIso: start.toISOString(),
        todayEndIso: end.toISOString()
    };
};



const fetchTodayAppointmentsCount = async (doctorId: string) => {
    const { todayStartIso, todayEndIso } = getTodayRangeISO();

   const { count, error } = await supabase
        .from("appointments")
        .select("availability!inner(start_time)", { count: "exact", head: true }) 
        .eq("doctor_id", doctorId)
        .gte("availability.start_time", todayStartIso) 
        .lte("availability.start_time", todayEndIso);

    if (error) throw new Error(`Error today appointments: ${error.message}`);

    return count ?? 0;
};

const fetchCountPatients = async (doctorId: string) => {
    const { data, error } = await supabase.rpc("count_unique_patients", {
        doc_id: doctorId,
    });

    if (error) throw new Error(`Error AI appointments: ${error.message}`);

    return (data as number) ?? 0;
};

const fetchAppointmentsWithAI = async (doctorId: string) => {
    const { count, error } = await supabase
        .from("appointments")
        .select("reports!inner(id)", { count: "exact", head: true })
        .eq("doctor_id", doctorId)
        .not("reports.ai_diagnosis_suggestion", "is", null);

    if (error) throw new Error(`Error counting patients: ${error.message}`);

    return count ?? 0;
};



const saveDoctorDiagnosis = async ({ appointmentId, diagnosis, aiRating }: AppointmentCompletionData) => {
    const { error: appointmentError } = await supabase
        .from("appointments")
        .update({
            status: "Finished",
            doctor_final_diagnosis: diagnosis,
        })
        .eq("id", appointmentId);

    if (appointmentError) throw appointmentError;


    const { data: appointment, error: fetchError } = await supabase
        .from("appointments")
        .select("report_id")
        .eq("id", appointmentId)
        .single();


    if (fetchError) throw new Error(`No report associated with the visit was found: ${fetchError.message}`);

    if (appointment?.report_id) {
        const { error: reportError } = await supabase
            .from("reports")
            .update({
                doctor_feedback_ai_rating: aiRating,
                status: "Completed"
            })
            .eq("id", appointment.report_id);

        if (reportError) throw reportError;
    }

};

