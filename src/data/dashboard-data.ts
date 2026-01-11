import { Doctor } from "@/types/Doctor";

export const patientPortalData = {
  aiCard: {
    label: "AI Medical Assistant",
    title: "Begin a New Consultation",
    description: "Describe your symptoms, and our AI assistant will conduct a medical consultation and help schedule an appointment with the appropriate specialist.",
    buttonText: "Begin a New Consultation"
  },
  quickActions: [
    {
      label: "My Appointments",
      description: "Browse all appointments",
      targetView: "visits",
    },
    {
      label: "Consultation History",
      description: "Return to previous AI conversations raports",
      targetView: "history",
    },
  ],
  subtitle: "Manage appointments and view reports"
};

export const patientInterview = {
  title: "AI Medical Assistant",
  subtitle: "Medical Interview",
  initialMessages: [
    {
      id: "msg-1",
      author: "ai" as const,
      text: "Hello! I am an AI medical assistant. Please tell me what concerns you? What are your symptoms?",
      time: "14:28",
    },
  ],
  inputPlaceholder: "Describe your symptoms...",
};

export const doctorDashboardData = {
  stats: {
    labelAppointments: "Appointments Today",
    labelReports: "Appointments with AI Report",
    labelPatients: "Total Patients",
  },
  scheduleDate: "Tuesday, November 25, 2025",
  schedule: [
    {
      id: "visit-1",
      patient: "Jan Kowalski",
      type: "Visit",
      time: "10:00",
      duration: "30 min",
      hasReport: true,
      symptoms: "Sore throat, slight fever",
      notes: "Prefers in-person consultation",
      aiSuggestion: "Laryngitis",
      tests: ["Swab", "Blood count"],
      confidence: 0.85,
      visitInfo: {
        patient: {
          name: "Jan Kowalski",
          age: "35 years",
          pesel: "85010112345",
        },
        report: {
          symptoms: "Sore throat, difficulty swallowing, slight fever (37.8°C)",
          duration: "3 days",
          info: "Patient reports worsening symptoms in the morning.",
          suggestion: "Laryngitis",
          confidence: 0.85,
          tests: ["Throat swab", "Blood count"],
        },
      },
    },
    {
      id: "visit-2",
      patient: "Maria Nowak",
      type: "Check-up",
      time: "11:00",
      duration: "30 min",
      hasReport: false,
      symptoms: "Check-up after antibiotic therapy",
      notes: "Check test results",
      aiSuggestion: null,
      tests: ["CRP"],
      confidence: null,
      visitInfo: {
        patient: {
          name: "Jan Kowalski",
          age: "35 years",
          pesel: "85010112345",
        },
      },
    },
    {
      id: "visit-3",
      patient: "Piotr Wiśniewski",
      type: "Visit",
      time: "14:00",
      duration: "30 min",
      hasReport: true,
      symptoms: "Cough, wheezing",
      notes: "Suspected asthma",
      aiSuggestion: "Bronchitis",
      tests: ["Chest X-ray"],
      confidence: 0.78,
      visitInfo: {
        patient: {
          name: "Piotr Wiśniewski",
          age: "42 years",
          pesel: "81040598234",
        },
        report: {
          symptoms: "Cough persisting for 2 weeks, wheezing during exertion",
          duration: "2 weeks",
          info: "Symptoms worsen at night and in the morning.",
          suggestion: "Bronchitis",
          confidence: 0.78,
          tests: ["Chest X-ray", "Spirometry"],
        },
      },
    },
  ],
};
export const DOCTORS: Doctor[] = [
  {
    id: "1",
    firstName: "Anna",
    lastName: "Nowak",
    email: "a.nowak@clinic.com",
    specialization: "Laryngolog",
    workStartDate: "2025-12-06",
    phone: "576199224",
    password: "12dsasw1",
  },
  {
    id: "2",
    firstName: "Piotr",
    lastName: "Kowalczyk",
    email: "p.kowalczyk@clinic.com",
    specialization: "Laryngolog",
    workStartDate: "2025-12-06",
    phone: "576199224",
    password: "12dsasw1",
  },
  {
    id: "3",
    firstName: "Maria",
    lastName: "Wiśniewska",
    email: "m.wisniewska@clinic.com",
    specialization: "Kardiolog",
    workStartDate: "2025-12-06",
    phone: "576199224",
    password: "12dsasw1",
  },
];
