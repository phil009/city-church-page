"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  KeyRound,
  QrCode,
  MapPin,
  Radio,
  Sparkles,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  ShieldCheck,
} from "lucide-react";
import CheckInSuccessModal from "./CheckInSuccessModal";
import { AttendanceRecord, ChurchMember, ChurchService, AttendanceType } from "@/types/attendance";

export default function AttendanceCheckInForm() {
  const searchParams = useSearchParams();

  // URL query parameters from QR code scan
  const paramServiceId = searchParams.get("serviceId") || "";
  const paramType = (searchParams.get("type") || "").toLowerCase();
  const paramCode = searchParams.get("code") || "";

  const [service, setService] = useState<ChurchService | null>(null);
  const [loadingService, setLoadingService] = useState(true);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendanceType, setAttendanceType] = useState<AttendanceType>(
    paramType === "online" ? "online" : "physical"
  );
  const [verificationCode, setVerificationCode] = useState(paramCode);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    record: AttendanceRecord;
    member: ChurchMember;
  } | null>(null);

  // Fetch active service or specific service
  useEffect(() => {
    async function loadService() {
      try {
        setLoadingService(true);
        const res = await fetch("/api/attendance/services");
        const json = await res.json();
        if (json.success && json.data) {
          const list: ChurchService[] = json.data;
          let match: ChurchService | undefined;
          if (paramServiceId) {
            match = list.find((s) => s.id === paramServiceId);
          }
          if (!match) {
            match = list.find((s) => s.status === "active") || list[0];
          }
          if (match) {
            setService(match);
            // If code is in URL or service has code and none entered yet, sync
            if (paramCode) {
              setVerificationCode(paramCode);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load service", err);
      } finally {
        setLoadingService(false);
      }
    }

    loadService();
  }, [paramServiceId, paramCode]);

  // Sync paramType if changed
  useEffect(() => {
    if (paramType === "online") {
      setAttendanceType("online");
    } else if (paramType === "physical") {
      setAttendanceType("physical");
    }
  }, [paramType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!verificationCode.trim()) {
      setErrorMessage("Please enter the 4- or 5-digit service verification code.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/attendance/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          attendanceType,
          verificationCode: verificationCode.trim(),
          serviceId: service?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to register attendance. Please try again.");
        return;
      }

      setSuccessData(data.data);
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <CheckInSuccessModal
        record={successData.record}
        member={successData.member}
        onReset={() => {
          setSuccessData(null);
          setFullName("");
          setEmail("");
          setPhone("");
          setErrorMessage(null);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Service Info Banner */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-appRed bg-red-950/70 border border-red-500/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-appRed animate-pulse" />
                {service?.status === "active" ? "Active Service" : "Service Info"}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {service?.date || "Sunday Service"}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white pt-1">
              {service?.title || "City Church Calabar Sunday Service"}
            </h2>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>Service Time: {service?.startTime || "09:00"} - {service?.closingTime || "12:00"}</span>
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/20 flex items-center justify-center text-appRed shrink-0">
            <QrCode className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Attendance Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6"
      >
        {/* Attendance Type Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Attendance Category <span className="text-appRed">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAttendanceType("physical")}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                attendanceType === "physical"
                  ? "bg-red-950/50 border-red-500 text-white shadow-lg shadow-red-950/30"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  attendanceType === "physical"
                    ? "bg-appRed text-white"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Physical In-Person</div>
                <div className="text-[11px] text-zinc-400">At The Big Tent, Calabar</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAttendanceType("online")}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                attendanceType === "online"
                  ? "bg-blue-950/50 border-blue-500 text-white shadow-lg shadow-blue-950/30"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  attendanceType === "online"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Online Stream</div>
                <div className="text-[11px] text-zinc-400">YouTube / Facebook Live</div>
              </div>
            </button>
          </div>
          {paramType && (
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Category auto-selected from scanned QR code</span>
            </p>
          )}
        </div>

        {/* Member Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Full Name <span className="text-appRed">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Emmanuel Bassey"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-appRed transition-colors"
            />
          </div>
        </div>

        {/* Member Email */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Email Address <span className="text-appRed">*</span>
            </label>
            <span className="text-[11px] text-zinc-500">Primary Member Identifier</span>
          </div>
          <div className="relative">
            <Mail className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="e.g. emmanuel@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-appRed transition-colors"
            />
          </div>
        </div>

        {/* Phone Number (Optional) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Phone Number <span className="text-zinc-600 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="e.g. 0803 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-appRed transition-colors"
            />
          </div>
        </div>

        {/* Service Verification Code */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Service Verification Code (4 or 5 Digits) <span className="text-appRed">*</span>
            </label>
            <span className="text-[11px] text-amber-400/90 font-mono">Displayed on Church Screen</span>
          </div>
          <div className="relative">
            <KeyRound className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              maxLength={5}
              placeholder="e.g. 7429"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-base sm:text-lg font-mono tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:border-appRed transition-colors"
            />
          </div>
          {paramCode && (
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verification code pre-filled from QR code</span>
            </p>
          )}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Check-in Error</span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || loadingService}
          className="w-full bg-appRed hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-4 rounded-full text-base sm:text-lg transition-all duration-300 shadow-xl shadow-red-950/50 hover:shadow-red-700/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying & Recording Attendance...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>Register Attendance</span>
            </>
          )}
        </button>

        {/* Duplicate Prevention Note */}
        <p className="text-center text-[11px] text-zinc-500">
          The system prevents duplicate check-ins for the same member and service.
        </p>
      </form>
    </div>
  );
}

