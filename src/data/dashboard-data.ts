export const patientPortalData = {
  interviewCopy:
    "Opisz swoje objawy, a nasz asystent AI przeprowadzi wywiad medyczny i pomoże umówić wizytę u odpowiedniego specjalisty.",
  quickActions: [
    {
      label: "Moje wizyty",
      description: "Przeglądaj wszystkie potwierdzone terminy",
      targetView: "visits",
    },
    {
      label: "Historia wywiadów",
      description: "Wróć do poprzednich rozmów z AI",
      targetView: "history",
    },
  ],
  upcomingHighlight: {
    doctor: "Dr Anna Nowak",
    specialization: "Laryngolog",
    date: "Wtorek, 25 listopada 2025",
    time: "10:00",
    status: "Potwierdzona",
  },
};

export const patientAppointments = {
  upcoming: [
    {
      doctor: "Dr Anna Nowak",
      specialization: "Laryngolog",
      date: "Wtorek, 25 listopada 2025",
      time: "10:00",
      duration: "30 min",
      status: "Potwierdzona",
      location: "Gabinet 12, ul. Zdrowa 4",
    },
    {
      doctor: "Dr Piotr Wiśniewski",
      specialization: "Internista",
      date: "Środa, 3 grudnia 2025",
      time: "09:30",
      duration: "30 min",
      status: "Oczekująca",
      location: "Teleporada",
    },
  ],
  history: [
    {
      doctor: "Dr Maria Nowak",
      specialization: "Kontrolna",
      date: "12 września 2025",
      notes: "Kontrola po antybiotykoterapii",
      status: "Zakończona",
    },
    {
      doctor: "Dr Tomasz Lis",
      specialization: "Dermatolog",
      date: "8 sierpnia 2025",
      notes: "Diagnoza alergii skórnej",
      status: "Zakończona",
    },
  ],
};

export const patientInterviewHistory = [
  {
    id: "rap-3051",
    date: "25 listopada 2025 · 14:28",
    summary: "Ból gardła, trudności w połykaniu",
    status: "Wysłano do lekarza",
  },
  {
    id: "rap-2972",
    date: "3 listopada 2025 · 09:10",
    summary: "Katar i uczucie zatkanego nosa",
    status: "Zalecono teleporadę",
  },
  {
    id: "rap-2830",
    date: "18 października 2025 · 19:46",
    summary: "Ból głowy, zmęczenie",
    status: "Zakończono",
  },
];

export const patientInterview = {
  title: "Asystent Medyczny AI",
  subtitle: "Wywiad medyczny",
  initialMessages: [
    {
      id: "msg-1",
      author: "ai" as const,
      text: "Witaj! Jestem asystentem medycznym AI. Opowiedz mi proszę, co Cię niepokoi? Jakie masz objawy?",
      time: "14:28",
    },
  ],
  inputPlaceholder: "Opisz swoje objawy...",
};

export const doctorDashboardData = {
  stats: [
    { label: "Wizyty dziś", value: "8", accent: "bg-blue-100 text-blue-600" },
    {
      label: "Z raportem AI",
      value: "5",
      accent: "bg-purple-100 text-purple-600",
    },
    {
      label: "Pacjenci",
      value: "156",
      accent: "bg-emerald-100 text-emerald-600",
    },
  ],
  scheduleDate: "wtorek, 25 listopada 2025",
  schedule: [
    {
      id: "visit-1",
      patient: "Jan Kowalski",
      type: "Wizyta",
      time: "10:00",
      duration: "30 min",
      hasReport: true,
      symptoms: "Ból gardła, lekka gorączka",
      notes: "Preferuje konsultację stacjonarną",
      aiSuggestion: "Zapalenie krtani",
      tests: ["Wymaz", "Morfologia"],
      confidence: 0.85,
      visitInfo: {
        patient: { name: "Jan Kowalski", age: "35 lat", pesel: "85010112345" },
        report: {
          symptoms:
            "Ból gardła, trudności w połykaniu, lekka gorączka (37.8°C)",
          duration: "3 dni",
          info: "Pacjent zgłasza nasilenie objawów w godzinach porannych.",
          suggestion: "Zapalenie krtani",
          confidence: 0.85,
          tests: ["Wymaz z gardła", "Morfologia krwi"],
        },
      },
    },
    {
      id: "visit-2",
      patient: "Maria Nowak",
      type: "Kontrolna",
      time: "11:00",
      duration: "30 min",
      hasReport: false,
      symptoms: "Kontrola po antybiotykoterapii",
      notes: "Sprawdź wyniki badań",
      aiSuggestion: null,
      tests: ["CRP"],
      confidence: null,
    },
    {
      id: "visit-3",
      patient: "Piotr Wiśniewski",
      type: "Wizyta",
      time: "14:00",
      duration: "30 min",
      hasReport: true,
      symptoms: "Kaszel, świszczący oddech",
      notes: "Podejrzenie astmy",
      aiSuggestion: "Zapalenie oskrzeli",
      tests: ["RTG klatki piersiowej"],
      confidence: 0.78,
      visitInfo: {
        patient: {
          name: "Piotr Wiśniewski",
          age: "42 lata",
          pesel: "81040598234",
        },
        report: {
          symptoms:
            "Kaszel utrzymujący się od 2 tygodni, świszczący oddech przy wysiłku",
          duration: "2 tygodnie",
          info: "Objawy nasilają się w nocy i rano.",
          suggestion: "Zapalenie oskrzeli",
          confidence: 0.78,
          tests: ["RTG klatki piersiowej", "Spirometria"],
        },
      },
    },
  ],
};

export const adminDashboardData = {
  stats: [
    { label: "Lekarze", value: "3", accent: "bg-blue-100 text-blue-600" },
    {
      label: "Pacjenci",
      value: "156",
      accent: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Wizyty dzisiaj",
      value: "24",
      accent: "bg-purple-100 text-purple-600",
    },
  ],
  doctors: [
    {
      name: "Dr Anna Nowak",
      email: "a.nowak@clinic.com",
      specialization: "Laryngolog",
      experience: "15 lat",
      status: "Aktywny",
    },
    {
      name: "Dr Piotr Kowalczyk",
      email: "p.kowalczyk@clinic.com",
      specialization: "Laryngolog",
      experience: "12 lat",
      status: "Aktywny",
    },
    {
      name: "Dr Maria Wiśniewska",
      email: "m.wisniewska@clinic.com",
      specialization: "Kardiolog",
      experience: "20 lat",
      status: "Aktywny",
    },
  ],
  formDefaults: {
    firstName: "Anna",
    lastName: "Nowak",
    email: "a.nowak@clinic.com",
    specialization: "Laryngolog",
    experience: "15 lat",
    phone: "+48 123 456 789",
    temporaryPassword: "••••••••",
  },
};
