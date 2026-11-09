"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  KeyRound,
  QrCode,
  Monitor,
  CheckCircle2,
  XCircle,
  Trash2,
  Sparkles,
  Download,
  Eye,
  Loader2,
} from "lucide-react";
import { ChurchService, ServiceStatus } from "@/types/attendance";

interface ServiceManagementTabProps {
  services: ChurchService[];
  onRefresh: () => void;
  onOpenPresenter: (service: ChurchService) => void;
}

export default function ServiceManagementTab({
  services,
  onRefresh,
  onOpenPresenter,
}: ServiceManagementTabProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("12:30");
  const [verificationCode, setVerificationCode] = useState(
    Math.floor(1000 + Math.random() * 9000).toString()
  );
  const [status, setStatus] = useState<ServiceStatus>("active");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("The Big Tent, 98 Marian Road, Calabar");

  // QR Preview Modal State
  const [qrModalService, setQrModalService] = useState<ChurchService | null>(null);
  const [physicalQrUrl, setPhysicalQrUrl] = useState<string>("");
  const [onlineQrUrl, setOnlineQrUrl] = useState<string>("");
  const [loadingQr, setLoadingQr] = useState(false);

  const generateRandomCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      const res = await fetch("/api/attendance/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          startTime,
          closingTime,
          verificationCode,
          status,
          description,
          venue,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setTitle("");
        generateRandomCode();
        onRefresh();
      } else {
        alert(data.message || "Failed to create service.");
      }
    } catch {
      alert("Error creating service.");
    } finally {
      setCreating(false);
    }
  };

  const toggleServiceStatus = async (service: ChurchService) => {
    const nextStatus: ServiceStatus = service.status === "active" ? "completed" : "active";
    try {
      const res = await fetch(`/api/attendance/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/attendance/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete service", err);
    }
  };

  const openQrModal = async (service: ChurchService) => {
    setQrModalService(service);
    try {
      setLoadingQr(true);
      const [pRes, oRes] = await Promise.all([
        fetch(`/api/attendance/qr?serviceId=${service.id}&type=physical`),
        fetch(`/api/attendance/qr?serviceId=${service.id}&type=online`),
      ]);
      const [pData, oData] = await Promise.all([pRes.json(), oRes.json()]);
      if (pData.success) setPhysicalQrUrl(pData.data.qrDataUrl);
      if (oData.success) setOnlineQrUrl(oData.data.qrDataUrl);
    } catch (err) {
      console.error("Failed to fetch QRs", err);
    } finally {
      setLoadingQr(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Service Management</h2>
          <p className="text-xs text-zinc-400">
            Create services, manage 4/5-digit codes, generate QR codes, and control check-in windows.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-full bg-appRed hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-red-950/40"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Service</span>
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {services.map((svc) => {
          const isActive = svc.status === "active";
          return (
            <div
              key={svc.id}
              className={`p-6 rounded-3xl border transition-all ${
                isActive
                  ? "bg-zinc-950 border-red-500/50 shadow-xl shadow-red-950/20"
                  : "bg-zinc-900/80 border-zinc-800"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"
                        }`}
                      />
                      {svc.status}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {svc.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{svc.title}</h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                    Verification Code
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-amber-400">
                    {svc.verificationCode}
                  </span>
                </div>
              </div>

              {/* Timing & Venue */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>
                    {svc.startTime} – {svc.closingTime}
                  </span>
                </div>
                <div className="truncate text-right text-zinc-400">
                  {svc.venue || "The Big Tent"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleServiceStatus(svc)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                        : "bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {isActive ? "Deactivate" : "Activate Service"}
                  </button>

                  <button
                    onClick={() => openQrModal(svc)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR Codes</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenPresenter(svc)}
                    className="px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900 border border-red-500/30 text-white font-semibold flex items-center gap-1.5 transition-colors"
                    title="Open Screen Presenter"
                  >
                    <Monitor className="w-3.5 h-3.5 text-appRed" />
                    <span>Presenter</span>
                  </button>

                  <button
                    onClick={() => deleteService(svc.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                    title="Delete service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Service Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Create New Sunday Service</h3>
                <p className="text-xs text-zinc-400">Configure service schedule and attendance verification</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunday 1st Service - Covenant Encounter"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-appRed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-appRed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-appRed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    required
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-appRed"
                  />
                </div>
              </div>

              {/* Verification Code */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Verification Code (4 or 5 Digits)
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomCode}
                    className="text-xs text-appRed hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Generate Random</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-base font-mono tracking-widest text-amber-400 focus:outline-none focus:border-appRed"
                />
              </div>

              {/* Status & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Initial Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ServiceStatus)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-appRed"
                  >
                    <option value="active">Active (Open for Check-in)</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-appRed"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 rounded-xl bg-appRed hover:bg-red-700 text-white text-xs font-semibold shadow-lg shadow-red-950/40 flex items-center gap-1.5"
                >
                  {creating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Codes Modal */}
      {qrModalService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{qrModalService.title}</h3>
                <p className="text-xs text-zinc-400">
                  Verification Code: <span className="font-mono text-amber-400 font-bold">{qrModalService.verificationCode}</span>
                </p>
              </div>
              <button onClick={() => setQrModalService(null)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            {loadingQr ? (
              <div className="py-12 text-center text-zinc-500 text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-appRed" />
                <span>Generating Dual QR Codes...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Physical QR Card */}
                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/20 inline-block">
                    Physical Attendance QR
                  </span>
                  <div className="bg-white p-3 rounded-xl mx-auto w-fit">
                    {physicalQrUrl && <img src={physicalQrUrl} alt="Physical QR" className="w-44 h-44" />}
                  </div>
                  <p className="text-[11px] text-zinc-400">For display on screens inside The Big Tent</p>
                  <a
                    href={`/api/attendance/qr?serviceId=${qrModalService.id}&type=physical&format=png`}
                    download={`qr-${qrModalService.id}-physical.png`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </a>
                </div>

                {/* Online QR Card */}
                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-500/20 inline-block">
                    Online Attendance QR
                  </span>
                  <div className="bg-white p-3 rounded-xl mx-auto w-fit">
                    {onlineQrUrl && <img src={onlineQrUrl} alt="Online QR" className="w-44 h-44" />}
                  </div>
                  <p className="text-[11px] text-zinc-400">For YouTube & Facebook live video stream lower-thirds</p>
                  <a
                    href={`/api/attendance/qr?serviceId=${qrModalService.id}&type=online&format=png`}
                    download={`qr-${qrModalService.id}-online.png`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </a>
                </div>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                onClick={() => setQrModalService(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

