import { useCallback } from "react";
import { supabase } from "@/api/supabase";

export type DoctorAppointment = {
    id: string;
    time: string;
    duration: string;
    type: string;
    patientName: string;
    symptoms: string;
    hasAiReport: boolean;
};

export type DashboardStats = {
    todayAppointments: number;
    totalPatients: number;
    aiReports: number;
};

export type AiReportDetails = {
    appointmentId: string;
    symptoms: string;
    patient: {
        firstName: string;
        lastName: string;
        pesel: string;
        age: number;
    };
    report: {
        confidence: number;
        recommended_specializations: string;
        duration: string | null;
        suggestion: string;
        summary: string;
    } | null;
};

export const useDoctor = (userId: string | undefined) => {

    const getUpcomingAppointments = useCallback(async (): Promise<DoctorAppointment[]> => {
        if (!userId) return [];

        try {
            const data = await fetchTodayAppointments(userId);
            return data;
        } catch (error) {
            console.error("Error fetching upcoming appointments:", error);
            return [];
        }
    }, [userId]);

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
            console.error("Error fetching doctor stats:", error);
            return null;
        }
    }, [userId]);

    const getReportAiDetails = useCallback(async (appointmentId: string): Promise<AiReportDetails | null> => {
        try {
            const data = await fetchReportAiDetails(appointmentId);
            return data;
        } catch (error) {
            console.error("Error fetching AI report:", error);
            return null;
        }
    }, [userId]);

    return { getUpcomingAppointments, getStats, getReportAiDetails };
};



const fetchTodayAppointmentsCount = async (doctorId: string) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { count, error } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("doctor_id", doctorId)
        .gte("scheduled_time", todayStart.toISOString())
        .lte("scheduled_time", todayEnd.toISOString());

    if (error) console.error('Error today appointments:', error);

    return count ?? 0;
};

const fetchCountPatients = async (doctorId: string) => {
    const { data, error } = await supabase.rpc("count_unique_patients", {
        doc_id: doctorId,
    });

    if (error) console.error('Error AI appointments:', error);

    return (data as number) ?? 0;
};

const fetchAppointmentsWithAI = async (doctorId: string) => {
    const { count, error } = await supabase
        .from("appointments")
        .select("reports!inner(id)", { count: "exact", head: true })
        .eq("doctor_id", doctorId)
        .not("reports.ai_suggestion", "is", null);

    if (error) console.error('Error counting patients:', error);

    return count ?? 0;
};




const fetchTodayAppointments = async (
    doctorId: string
): Promise<DoctorAppointment[]> => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
        .from("appointments")
        .select(`
                id,
                scheduled_time,
                duration,
                visit_type,
                symptoms, 
                profiles!patient_id (first_name, last_name),
                reports (ai_suggestion)
        `)
        .eq("doctor_id", doctorId)
        .gte("scheduled_time", todayStart.toISOString())
        .lte("scheduled_time", todayEnd.toISOString())
        .order("scheduled_time", { ascending: true });

    if (error) {
        console.error('Error getting today appointments:', error);
        return [];
    }

    return data.map(formatTodayAppointment);
};

const formatTodayAppointment = (item: any): DoctorAppointment => {
    const hasAiReport = !!(item.reports && item.reports.ai_suggestion);
    const patient = Array.isArray(item.profiles)
        ? item.profiles[0]
        : item.profiles;

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




export const fetchReportAiDetails = async (
    appointmentId: string
): Promise<AiReportDetails | null> => {

    const { data, error } = await supabase
        .from("appointments")
        .select(`
                id,
                symptoms,
                profiles!patient_id (
                    first_name,
                    last_name,
                    pesel,
                    date_of_birth
                ),
                reports (
                    ai_confidence_score,
                    ai_recommended_specializations,
                    sickness_duration,
                    ai_suggestion,
                    ai_summary
                )
        `)
        .eq("id", appointmentId)
        .single();

    if (error) {
        console.error("Error fetching raport AI details:", error);
        return null;
    }

    if (!data) return null;

    return formatReport(data)
};

const formatReport = (data: any): AiReportDetails => {
    const patient = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;
    const report = Array.isArray(data.reports) ? data.reports[0] : data.reports;

    return {
        appointmentId: data.id,
        symptoms: data.symptoms,
        patient: {
            firstName: patient?.first_name,
            lastName: patient?.last_name,
            pesel: patient?.pesel,
            age: calculateAge(patient?.date_of_birth),
        },
        report: report
            ? {
                confidence: report.ai_confidence_score,
                recommended_specializations: report.ai_recommended_specializations,
                duration: report.sickness_duration,
                suggestion: report.ai_suggestion,
                summary: report.ai_summary,
            }
            : null,
    };
}

const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};