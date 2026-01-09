"use client";

import DoctorOverview from "@/components/dashboards/doctor/DoctorOverview";
import { mockAccounts } from "@/data/mock-accounts";

export default function DoctorPage() {
    const user = mockAccounts[0];

    return (
        <main className="flex-1 w-full">
            <DoctorOverview
                user={user}
            />
        </main>
    );
}
