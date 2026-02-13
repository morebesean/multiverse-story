"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScenarioPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/profile");
    }, [router]);
    return null;
}
