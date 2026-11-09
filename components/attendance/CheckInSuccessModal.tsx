"use client";

import { motion } from "framer-motion";
import { CheckCircle2, QrCode, Calendar, Clock, User, Mail, Compass, Share2 } from "lucide-react";
import Link from "next/link";
import { AttendanceRecord, ChurchMember } from "@/types/attendance";

interface CheckInSuccessModalProps {
  record: AttendanceRecord;
  member: ChurchMember;
  onReset: () => void;
}

export default function CheckInSuccessModal({
  record,
  member,
  onReset,
}: CheckInSuccessModalProps) {
  const isPhysical = record.attendanceType === "physical";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-zinc-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            Attendance Verified
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-2">
            Welcome, {record.memberName}!
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Your attendance has been officially recorded for today&apos;s service at City Church Calabar.
          </p>
        </div>
      </div>

      {/* Verification Card */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-300">Member ID</span>
          <span className="font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
            {member.id}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-xs text-zinc-500 block">Service</span>
            <span className="font-medium text-white">{record.serviceTitle}</span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block">Attendance Type</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-0.5 ${
                isPhysical
                  ? "bg-red-950/70 text-red-300 border border-red-500/30"
                  : "bg-blue-950/70 text-blue-300 border border-blue-500/30"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isPhysical ? "bg-red-400" : "bg-blue-400"}`} />
              {isPhysical ? "Physical (The Big Tent)" : "Online Live Stream"}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block">Date & Time</span>
            <span className="font-medium text-zinc-300 text-xs">
              {record.serviceDate} • {new Date(record.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block">Yearly Attendance Count</span>
            <span className="font-medium text-amber-300 text-xs font-mono">
              {member.totalAttendancesYear} services attended in 2026
            </span>
          </div>
        </div>
      </div>

      {/* Pastoral Blessing Quote */}
      <div className="mt-6 p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-center">
        <p className="text-xs sm:text-sm text-zinc-300 italic">
          &ldquo;We are blessed to worship together as one family. May God&apos;s peace, direction, and favor follow you throughout this week.&rdquo;
        </p>
        <span className="block text-[11px] font-bold text-appRed mt-1 uppercase tracking-wider">
          — Pastor Tony Aleogena Raphael (Lead Pastor)
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-all"
        >
          Check In Another Person
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-appRed hover:bg-red-700 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
        >
          <Compass className="w-4 h-4" />
          <span>Explore City Church</span>
        </Link>
      </div>
    </motion.div>
  );
}

