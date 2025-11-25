"use client";

import type { Account } from "@/types/account";
import { Lock, Mail, Stethoscope } from "lucide-react";
import type { FormEvent } from "react";

type LoginScreenProps = {
  accounts: Account[];
  email: string;
  password: string;
  error: string;
  onFieldChange: (field: "email" | "password", value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function LoginScreen({
  accounts,
  email,
  password,
  error,
  onFieldChange,
  onSubmit,
}: LoginScreenProps) {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/95 p-8 shadow-2xl shadow-blue-100 ring-1 ring-slate-100">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Stethoscope className="h-8 w-8" />
          </div>
          <p className="text-sm uppercase tracking-widest text-blue-500">
            Logowanie
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Witaj w systemie medycznym HealthCare
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Skorzystaj z jednego z kont testowych, aby zobaczyć różne role.
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-blue-50 p-4 text-left text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Testowe konta:</p>
          <ul className="mt-3 space-y-1">
            {accounts.map((account) => (
              <li
                key={account.role}
                className="flex items-center justify-between"
              >
                <span className="font-medium">
                  {account.role === "patient"
                    ? "Pacjent"
                    : account.role === "doctor"
                    ? "Lekarz"
                    : "Admin"}
                  :
                </span>
                <span>{account.email}</span>
              </li>
            ))}
            <li className="pt-1 text-slate-600">Hasło: test123</li>
          </ul>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => onFieldChange("email", event.target.value)}
                placeholder="twoj@email.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="password"
            >
              Hasło
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) =>
                  onFieldChange("password", event.target.value)
                }
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
            <a
              href="#"
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Nie pamiętasz hasła?
            </a>
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </section>
  );
}
