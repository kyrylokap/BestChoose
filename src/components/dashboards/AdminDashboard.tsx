"use client";

import { adminDashboardData } from "@/data/dashboard-data";
import type { Account } from "@/types/account";
import {
  ArrowLeft,
  Edit2,
  LogOut,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

type DashboardProps = {
  user: Account;
  onLogout: () => void;
};

type AdminView = "overview" | "addDoctor";

export default function AdminDashboard({ user, onLogout }: DashboardProps) {
  const [view, setView] = useState<AdminView>("overview");

  if (view === "addDoctor") {
    return (
      <AddDoctorForm
        onBack={() => setView("overview")}
        onCancel={() => setView("overview")}
      />
    );
  }

  return (
    <section className="w-full space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {user.name}
              </h2>
              <p className="text-sm text-slate-500">{user.subtitle}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-white"
        >
          <LogOut className="h-4 w-4" />
          Wyloguj
        </button>
      </header>

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Zarządzanie systemem
        </h1>
        <p className="text-slate-500">
          Administruj użytkownikami i ustawieniami
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {adminDashboardData.stats.map(
          (metric: { label: string; value: string; accent: string }) => (
            <div
              key={metric.label}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-sm text-slate-600">{metric.label}</p>
              <div
                className={`mt-3 inline-flex items-center justify-center rounded-2xl px-4 py-2 ${metric.accent}`}
              >
                <p className="text-3xl font-bold">{metric.value}</p>
              </div>
            </div>
          )
        )}
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Zarządzanie lekarzami</h3>
          </div>
          <button
            onClick={() => setView("addDoctor")}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4" />
            Dodaj lekarza
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="pb-3 font-semibold text-slate-900">
                  Imię i nazwisko
                </th>
                <th className="pb-3 font-semibold text-slate-900">Email</th>
                <th className="pb-3 font-semibold text-slate-900">
                  Specjalizacja
                </th>
                <th className="pb-3 font-semibold text-slate-900">
                  Doświadczenie
                </th>
                <th className="pb-3 font-semibold text-slate-900">Status</th>
                <th className="pb-3 font-semibold text-slate-900">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {adminDashboardData.doctors.map((doctor) => (
                <tr key={doctor.email} className="border-b border-slate-100">
                  <td className="py-4 text-slate-900">{doctor.name}</td>
                  <td className="py-4 text-slate-600">{doctor.email}</td>
                  <td className="py-4 text-slate-600">
                    {doctor.specialization}
                  </td>
                  <td className="py-4 text-slate-600">{doctor.experience}</td>
                  <td className="py-4">
                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {doctor.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                        title="Edytuj"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        title="Usuń"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function AddDoctorForm({
  onBack,
  onCancel,
}: {
  onBack: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(adminDashboardData.formDefaults);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert("Lekarz został dodany!");
    onBack();
  };

  return (
    <section className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dodaj nowego lekarza
          </h1>
          <p className="text-sm text-slate-500">Wypełnij dane lekarza</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="mb-6 text-lg font-semibold text-slate-900">
          Dane lekarza
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Imię <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Nazwisko <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="specialization"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Specjalizacja <span className="text-red-500">*</span>
              </label>
              <input
                id="specialization"
                type="text"
                required
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="experience"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Doświadczenie
              </label>
              <input
                id="experience"
                type="text"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Hasło tymczasowe <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.temporaryPassword}
              onChange={(e) =>
                setFormData({ ...formData, temporaryPassword: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
            <p className="mt-2 text-xs text-slate-500">
              Lekarz będzie mógł zmienić hasło po pierwszym logowaniu
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Zapisz lekarza
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
