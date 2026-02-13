"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

interface AdBannerProps {
    slot: string;
    format?: "auto" | "rectangle" | "horizontal" | "vertical";
    className?: string;
}

export function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!slot || isLoaded.current) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isLoaded.current = true;
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, [slot]);

    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

    if (!slot || !clientId) {
        // Dev placeholder when AdSense is not configured
        if (process.env.NODE_ENV === "development") {
            return (
                <div className={className}>
                    <div className="w-full min-h-[250px] flex flex-col items-center justify-center bg-secondary/20 border border-dashed border-border/50 rounded-xl">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">ADVERTISEMENT</span>
                        <span className="text-xs text-muted-foreground italic">AdSense Placeholder</span>
                        <span className="text-[10px] text-muted-foreground mt-1">Set NEXT_PUBLIC_ADSENSE_CLIENT_ID & NEXT_PUBLIC_ADSENSE_SLOT_LOADING</span>
                    </div>
                </div>
            );
        }
        return null;
    }

    return (
        <div className={className}>
            <div className="w-full min-h-[250px] flex flex-col items-center justify-center overflow-hidden">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client={clientId}
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
