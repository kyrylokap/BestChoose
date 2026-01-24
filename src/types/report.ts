export type AiReportData = {
    summary: string;
    duration: string;
    ai_diagnosis_suggestion: string;
    ai_confidence_score: number;
    ai_recommended_specializations: string[];
    reported_symptoms: string;
};


export type SummaryReportDetails = {
    appointmentId: string;
    reported_symptoms: string;
    doctor_final_diagnosis: string | null;
    patient: {
        firstName: string;
        lastName: string;
        pesel: string;
        age: number;
    };
    doctor: {
        firstName: string;
        lastName: string;
    };
    details: {
        summary: string;
        duration: string;
        ai_confidence_score: number;
        ai_recommended_specializations: string[];
        ai_diagnosis_suggestion: string;
        doctor_feedback_ai_rating: string | null;
    } | null;
};

