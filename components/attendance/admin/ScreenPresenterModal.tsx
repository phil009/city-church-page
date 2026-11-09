"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { QrCode, Maximize2, Minimize2, X, MapPin, Radio, Copy, Check } from "lucide-react";
import { ChurchService, AttendanceType } from "@/types/attendance";

interface ScreenPresenterModalProps {
  service: ChurchService;
  onClose: () => void;
}

export default function ScreenPresenterModal({
  service,
  onClose,
}: ScreenPresenterModalProps) {
  const [selectedType, setSelectedType] = useState<AttendanceType>("physical");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadQr() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/attendance/qr?serviceId=${encodeURIComponent(service.id)}&type=${selectedType}`
        );
        const json = await res.json();
        if (json.success && json.data) {
          setQrDataUrl(json.data.qrDataUrl);
        }
      } catch (err) {
        console.error("Failed to load QR", err);
      } finally {
        setLoading(false);
      }
    }
    loadQr();
  }, [service.id, selectedType]);

  const copyCode = () => {
    navigator.clipboard.writeText(service.verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 text-white overflow-y-auto">
      {/* Top Bar Controls */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              Church Screen & Projector Display Mode
            </h1>
            <p className="text-xs text-zinc-400">
              Project this screen in the sanctuary or show on the live video stream.
            </p>
          </div>
        </div>

        {/* Tab switch & close */}
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setSelectedType("physical")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedType === "physical"
                  ? "bg-appRed text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Physical (Big Tent)</span>
            </button>
            <button
              onClick={() => setSelectedType("online")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedType === "online"
                  ? "bg-blue-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Online Stream</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title="Close Presenter Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="my-auto py-8 max-w-4xl w-full mx-auto text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/80 border border-red-500/30 px-4 py-1.5 rounded-full inline-block">
            City Church Calabar • Sunday Attendance Check-In
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {service.title}
          </h2>
          <p className="text-sm sm:text-lg text-zinc-300">
            Scan the QR code with your phone camera or visit:{" "}
            <span className="text-appRed font-mono font-bold">citychurchcalabar.org/attendance</span>
          </p>
        </div>

        {/* QR Code and Code Display Box */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-8 bg-zinc-900/90 border-2 border-zinc-700 p-8 sm:p-10 rounded-3xl shadow-2xl">
          {/* QR Code Image */}
          <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center justify-center">
            {loading ? (
              <div className="w-64 h-64 flex items-center justify-center text-zinc-600">
                <span className="animate-spin text-sm">Loading QR Code...</span>
              </div>
            ) : qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Service Attendance QR Code"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain"
              />
            ) : null}
          </div>

          {/* Verification Code Box */}
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-zinc-400 block">
                Verification Code
              </span>
              <div className="text-5xl sm:text-6xl md:text-7xl font-mono font-black text-amber-400 tracking-wider pt-1">
                {service.verificationCode}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-400 max-w-xs">
              <p className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Attendance Window: {service.startTime} – {service.closingTime}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-appRed" />
                <span>Venue: {service.venue || "The Big Tent"}</span>
              </p>
            </div>

            <button
              onClick={copyCode}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Code Copied!" : "Copy Code"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-zinc-500 border-t border-zinc-900 pt-4 max-w-4xl mx-auto w-full">
        Press <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">ESC</kbd> or click the Close button to return to the Admin Dashboard.
      </div>
    </div>
  );
}

