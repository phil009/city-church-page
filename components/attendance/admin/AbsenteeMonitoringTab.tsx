"use client";

import { useState, useEffect } from "react";
import {
  UserX,
  AlertTriangle,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Loader2,
} from "lucide-react";
import { AbsenteeRecord, ChurchService } from "@/types/attendance";

interface AbsenteeMonitoringTabProps {
  services: ChurchService[];
  onQueueFollowUp: (absentee: AbsenteeRecord, serviceId: string) => void;
}

export default function AbsenteeMonitoringTab({
  services,
  onQueueFollowUp,
}: AbsenteeMonitoringTabProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services.length > 0 ? services[0].id : ""
  );
  const [absentees, setAbsentees] = useState<AbsenteeRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [consecutiveFilter, setConsecutiveFilter] = useState<string>("all");

  const loadAbsentees = async (svcId: string) => {
    if (!svcId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/attendance/absentees?serviceId=${encodeURIComponent(svcId)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setAbsentees(json.data);
      }
    } catch (err) {
      console.error("Failed to load absentees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedServiceId) {
      loadAbsentees(selectedServiceId);
    }
  }, [selectedServiceId]);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  // Filter based on consecutive count
  const filtered = absentees.filter((a) => {
    if (consecutiveFilter === "1") return a.consecutiveAbsences === 1;
    if (consecutiveFilter === "2") return a.consecutiveAbsences === 2;
    if (consecutiveFilter === "3plus") return a.consecutiveAbsences >= 3;
    return true;
  });

  const count1 = absentees.filter((a) => a.consecutiveAbsences === 1).length;
  const count2 = absentees.filter((a) => a.consecutiveAbsences === 2).length;
  const count3Plus = absentees.filter((a) => a.consecutiveAbsences >= 3).length;

  return (
    <div className="space-y-6">
      {/* Header and Service Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Absentee Monitoring</h2>
          <p className="text-xs text-zinc-400">
            Compare registered members against service rosters to identify absent members and consecutive absences.
          </p>
        </div>

        {/* Service Selector Dropdown */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-zinc-500" />
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-appRed"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.date} — {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Total Absentees */}
        <button
          onClick={() => setConsecutiveFilter("all")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            consecutiveFilter === "all"
              ? "bg-zinc-900 border-zinc-600 shadow"
              : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
            Total Absentees
          </span>
          <span className="text-2xl font-black text-white font-mono">{absentees.length}</span>
          <span className="text-[10px] text-zinc-500 block">For selected service</span>
        </button>

        {/* 1 Sunday Missed */}
        <button
          onClick={() => setConsecutiveFilter("1")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            consecutiveFilter === "1"
              ? "bg-amber-950/40 border-amber-500 shadow"
              : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
            1 Missed Service
          </span>
          <span className="text-2xl font-black text-amber-400 font-mono">{count1}</span>
          <span className="text-[10px] text-zinc-500 block">Recent absence check-in</span>
        </button>

        {/* 2 Consecutive Missed */}
        <button
          onClick={() => setConsecutiveFilter("2")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            consecutiveFilter === "2"
              ? "bg-orange-950/40 border-orange-500 shadow"
              : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 block">
            2 Consecutive Missed
          </span>
          <span className="text-2xl font-black text-orange-400 font-mono">{count2}</span>
          <span className="text-[10px] text-zinc-500 block">Caring pastoral check</span>
        </button>

        {/* 3+ Consecutive Missed (Alert) */}
        <button
          onClick={() => setConsecutiveFilter("3plus")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            consecutiveFilter === "3plus"
              ? "bg-red-950/50 border-red-500 shadow"
              : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>3+ Consecutive (Priority)</span>
          </span>
          <span className="text-2xl font-black text-red-400 font-mono">{count3Plus}</span>
          <span className="text-[10px] text-zinc-500 block">Requires pastoral attention</span>
        </button>
      </div>

      {/* Absentees Table */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs">
          <span className="font-semibold text-white">
            Absent Members ({filtered.length} shown)
          </span>
          <span className="text-zinc-500 font-mono text-[11px]">
            Target Service: {selectedService?.title}
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-zinc-500 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-appRed" />
            <span>Analyzing attendance records...</span>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-zinc-500 py-8 text-center">
            No absentees matching the selected criteria.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 font-semibold">Member</th>
                  <th className="py-3 font-semibold">Member ID</th>
                  <th className="py-3 font-semibold text-center">Consecutive Absences</th>
                  <th className="py-3 font-semibold">Last Attended</th>
                  <th className="py-3 font-semibold text-center">Follow-Up Status</th>
                  <th className="py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filtered.map((abs) => {
                  const isHighAlert = abs.consecutiveAbsences >= 3;
                  const isMedAlert = abs.consecutiveAbsences === 2;
                  return (
                    <tr key={abs.memberId} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-3.5 font-medium text-white">
                        <div className="font-bold text-white text-sm">{abs.fullName}</div>
                        <div className="text-[11px] text-zinc-400">{abs.email}</div>
                      </td>

                      <td className="py-3.5 font-mono text-zinc-300 font-semibold">{abs.memberId}</td>

                      <td className="py-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                            isHighAlert
                              ? "bg-red-950 text-red-300 border border-red-500/40"
                              : isMedAlert
                              ? "bg-orange-950 text-orange-300 border border-orange-500/30"
                              : "bg-amber-950 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {isHighAlert && <AlertTriangle className="w-3 h-3 text-red-400" />}
                          <span>{abs.consecutiveAbsences} in a row</span>
                        </span>
                      </td>

                      <td className="py-3.5 text-zinc-400 font-mono">
                        {abs.lastAttendedDate || "Never logged"}
                      </td>

                      <td className="py-3.5 text-center">
                        {abs.followUpStatus === "sent" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Sent</span>
                          </span>
                        ) : abs.followUpStatus === "pending_review" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>In Review</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-zinc-500">Not Initiated</span>
                        )}
                      </td>

                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => onQueueFollowUp(abs, selectedServiceId)}
                          disabled={abs.followUpStatus === "sent"}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                            abs.followUpStatus === "sent"
                              ? "opacity-40 cursor-not-allowed bg-zinc-800 text-zinc-500"
                              : "bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-500/30 shadow-sm"
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{abs.followUpStatus === "sent" ? "Sent" : "Follow-Up"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

