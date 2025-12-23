"use client";
import { useAuth } from "@/hooks/useAuth";
import { Lock, Mail, Stethoscope, User2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

  const [lastName, setLastName] = useState<string>("");

  const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    console.log("register");
  };
  return (
    <main>
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/95 p-8 shadow-2xl shadow-blue-100 ring-1 ring-slate-100 ">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Stethoscope className="h-8 w-8" />
          </div>
          <p className="text-sm uppercase tracking-widest text-blue-500">
            Register
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Welcome in medical system BestChoose
          </h1>
        </div>

        <form className="space-y-5" onSubmit={onSubmitRegister}>
          <div>
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="firstName"
            >
              First Name
            </label>
            <div className="relative mt-2">
              <User2Icon className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
          <div>
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <div className="relative mt-2">
              <User2Icon className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
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
                onChange={(event) => setEmail(event.target.value)}
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
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <Link
              href={"/login"}
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Log in
            </Link>
          </div>

          {/* {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )} */}

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
