import type { Account } from "@/types/account";

export const mockAccounts: Account[] = [
  {
    role: "patient",
    email: "patient@test.com",
    password: "test",
    name: "Jan Kowalski",
    subtitle: "Patient Dashboard",
  },
  {
    role: "doctor",
    email: "doctor@test.com",
    password: "test",
    name: "Dr Anna Nowak",
    subtitle: "Doctor Dashboard",
  },
  {
    role: "admin",
    email: "admin@test.com",
    password: "test",
    name: "Kyrylo Kapinos",
    subtitle: "Panel Administratora",
  },
];
