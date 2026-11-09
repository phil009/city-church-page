import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { QrCode, Lock, ShieldCheck, HeartHandshake } from "lucide-react";
import AttendanceCheckInForm from "@/components/attendance/AttendanceCheckInForm";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Service Attendance Check-In | City Church Calabar",
  description:
    "Register your attendance for City Church Calabar Sunday services via QR code or service verification code. In-person at The Big Tent or online live stream.",
  openGraph: {
    title: "Service Attendance Check-In | City Church Calabar",
    description:
      "Register your attendance for Sunday services via QR code or service verification code.",
  },
};

export default function AttendancePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-appRed selection:text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Atmosphere Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/70 border border-red-500/25 px-4 py-1.5 rounded-full">
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital Attendance Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sunday Service Check-In
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Welcome to City Church Calabar! Register your attendance for today&apos;s worship encounter.
            Scan the on-screen QR code or verify using the service code below.
          </p>
        </div>

        {/* Check-in Form wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<Loading />}>
          <AttendanceCheckInForm />
        </Suspense>

        {/* Church Admin Footer Link */}
        <div className="pt-8 text-center border-t border-zinc-900 flex items-center justify-center gap-4 text-xs text-zinc-500">
          <span>Are you a church administrator or pastor?</span>
          <Link
            href="/admin/attendance"
            className="text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <Lock className="w-3 h-3 text-appRed" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

