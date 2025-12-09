"use client";

import { doctorDashboardData } from "@/data/dashboard-data";
import type { Account } from "@/types/account";
import InfoBadge from "../../shared/InfoBadge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useMemo, useState } from "react";
import {
    CheckCircle2,
    ClipboardCheck,
    ClipboardClock,
    FileText,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";


type AiRatingType = "accurate" | "inaccurate" | null;

type DoctorVisitProps = {
    user: Account;
    visitId: string;
    onBack: () => void;
};



export default function DoctorVisit({
    user,
    visitId,
    onBack,
}: DoctorVisitProps) {
    const [diagnosis, setDiagnosis] = useState("");
    const [aiRating, setAiRating] = useState<AiRatingType>(null);
    const [savedMessage, setSavedMessage] = useState("");

    const selectedVisit = useMemo(
        () =>
            doctorDashboardData.schedule.find((visit) => visit.id === visitId) ??
            doctorDashboardData.schedule[0],
        [visitId]
    );

    const handleSave = () => {
        setSavedMessage("The appointment has been saved");
    };

    return (
        <section className="w-full space-y-8">
            <SectionHeader
                title="Appointment Details"
                subtitle="Patient information and AI analysis summary"
                onBack={onBack}
            />

            <AppointmentDetailsCard visit={selectedVisit} />

            <DiagnosisFormCard
                diagnosis={diagnosis}
                setDiagnosis={setDiagnosis}
                aiRating={aiRating}
                setAiRating={setAiRating}
                onSave={handleSave}
                savedMessage={savedMessage}
            />
        </section>
    );
}


const AppointmentDetailsCard = ({ visit }: { visit: any }) => {
    const hasReport = visit?.hasReport && visit.visitInfo;

    return (
        <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <ClipboardClock className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-xl font-semibold text-slate-900">
                        Selected Appointment
                    </p>
                    <p className="text-sm text-slate-500">
                        Review AI preliminary report summary and symptoms
                    </p>
                </div>
            </div>

            {hasReport ? (
                <>
                    <div className="grid gap-3 text-sm text-slate-600">
                        <InfoBadge label="Full Name" value={visit.visitInfo.patient.name} />
                        <InfoBadge label="Age" value={visit.visitInfo.patient.age} />
                        <InfoBadge label="PESEL" value={visit.visitInfo.patient.pesel} />
                    </div>
                    <AiReportSummary report={visit.visitInfo.report} />
                </>
            ) : (
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-500">
                    No AI report available for this appointment.
                </div>
            )}
        </section>
    );
};


const AiReportSummary = ({ report }: { report: any }) => {
    return (
        <div className="rounded-3xl border border-purple-100 bg-linear-to-br from-purple-50 to-white p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-purple-700">
                        AI Preliminary Report
                    </p>
                    <p className="text-xs text-slate-500">
                        Confidence: {Math.round((report.confidence ?? 0) * 100)}%
                    </p>
                </div>
                <Sparkles className="h-5 w-5 text-purple-400" />
            </div>

            <dl className="mt-4 space-y-3 text-sm text-slate-700">
                <div>
                    <dt className="font-semibold text-slate-900">Reported Symptoms</dt>
                    <dd>{report.symptoms}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-slate-900">Duration</dt>
                    <dd>{report.duration}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-slate-900">Additional Information</dt>
                    <dd>{report.info}</dd>
                </div>
            </dl>

            <div className="mt-4 rounded-2xl bg-white/90 p-4">
                <p className="text-xs uppercase text-purple-500">AI Suggestion</p>
                <p className="text-lg font-semibold text-purple-900">
                    {report.suggestion}
                </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {report.tests.map((test: string) => (
                    <span
                        key={test}
                        className="rounded-full border border-purple-100 bg-white px-4 py-1 text-xs font-medium text-purple-900"
                    >
                        {test}
                    </span>
                ))}
            </div>
        </div>
    );
};



type DiagnosisFormCardProps = {
    diagnosis: string;
    setDiagnosis: (val: string) => void;
    aiRating: AiRatingType;
    setAiRating: (val: AiRatingType) => void;
    onSave: () => void;
    savedMessage: string;
};

const DiagnosisFormCard = ({
    diagnosis,
    setDiagnosis,
    aiRating,
    setAiRating,
    onSave,
    savedMessage,
}: DiagnosisFormCardProps) => {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <FileText className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        Appointment Documentation
                    </h3>
                    <p className="text-sm text-slate-500">
                        Medical summary & AI validation
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <label
                    className="ml-1 block font-semibold text-slate-700"
                    htmlFor="diagnosis"
                >
                    Final Diagnosis
                </label>
                <textarea
                    id="diagnosis"
                    rows={6}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Type the final diagnosis here..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="mb-3 text-center text-sm font-medium text-slate-600 sm:text-left">
                    How accurate was the AI suggestion?
                </p>
                <div className="flex gap-3">
                    <AiRatingButton
                        type="accurate"
                        currentRating={aiRating}
                        onClick={() => setAiRating("accurate")}
                    />
                    <AiRatingButton
                        type="inaccurate"
                        currentRating={aiRating}
                        onClick={() => setAiRating("inaccurate")}
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={onSave}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.99]"
            >
                <ClipboardCheck className="h-5 w-5" />
                Save and End Appointment
            </button>

            {savedMessage && (
                <div className="mt-4 flex animate-in fade-in slide-in-from-bottom-2 items-center justify-center gap-2 rounded-2xl bg-emerald-50 py-3 text-sm font-medium text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                    {savedMessage}
                </div>
            )}
        </section>
    );
};

const AiRatingButton = ({
    type,
    currentRating,
    onClick,
}: {
    type: "accurate" | "inaccurate";
    currentRating: AiRatingType;
    onClick: () => void;
}) => {
    const isAccurate = type === "accurate";
    const isActive = currentRating === type;

    const baseClasses =
        "group flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all duration-200";

    const activeClasses = isAccurate
        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
        : "border-rose-500 bg-rose-50 text-rose-700 shadow-sm";

    const inactiveClasses = isAccurate
        ? "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700 hover:shadow-sm"
        : "border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-700 hover:shadow-sm";

    const Icon = isAccurate ? ThumbsUp : ThumbsDown;
    const iconRotateClass = isAccurate
        ? "group-hover:-rotate-12"
        : "group-hover:rotate-12";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <Icon
                className={`h-4 w-4 transition-transform ${iconRotateClass} ${isActive ? "fill-current" : ""}`}
            />
            {isAccurate ? "Accurate" : "Inaccurate"}
        </button>
    );
};

