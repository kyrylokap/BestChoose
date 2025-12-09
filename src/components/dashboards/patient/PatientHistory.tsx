import { SectionHeader } from "@/components/shared/SectionHeader";
import { patientInterviewHistory } from "@/data/dashboard-data";
import { ArrowLeft, Calendar, FileText, CheckCircle2, FileDown } from "lucide-react";

type HistoryItem = typeof patientInterviewHistory[0];

type Props = {
  onBack: () => void;
};

export default function PatientHistory({ onBack }: Props) {
  const history = patientInterviewHistory;

  return (
    <section className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Consultation History"
        subtitle="Archive of completed AI preliminary diagnoses"
        onBack={onBack}
      />

      <div className="flex flex-col gap-3">
        {history.length > 0 ? (
          history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))
        ) : (
          <div className="py-10 text-center text-slate-500">
            No consultation history
          </div>
        )}
      </div>
    </section>
  );
}


const HistoryCard = ({ item }: { item: HistoryItem }) => {
  const handleDownload = async (e: React.MouseEvent) => { };

  return (
    <div
      onClick={handleDownload}
      className="group cursor-pointer flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-blue-100 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
          <FileDown className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">{item.summary}</p>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{item.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span>{item.status}</span>
      </div>
    </div>
  )
};

