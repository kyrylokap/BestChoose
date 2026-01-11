"use client";
import { useSession } from "@/components/hoc/AuthSessionProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { session } = useSession();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/(dashboard)/" + session.role);
    }
  }, [router, session]);
  return <div></div>;
}
