import type { Account } from "@/types/account";

export const mockAccounts: Account[] = [
  {
    role: "patient",
    email: "patient@test.com",
    password: "test123",
    name: "Jan Kowalski",
    subtitle: "Panel Pacjenta",
  },
  {
    role: "doctor",
    email: "doctor@test.com",
    password: "test123",
    name: "Dr Anna Nowak",
    subtitle: "Panel Lekarza",
  },
  {
    role: "admin",
    email: "admin@test.com",
    password: "test123",
    name: "Ewa Gajda",
    subtitle: "Panel Administratora",
  },
];

