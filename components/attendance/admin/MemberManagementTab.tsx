"use client";

import { useState } from "react";
import { Search, User, Mail, Phone, Calendar, Clock, ArrowRight, X, Loader2 } from "lucide-react";
import { ChurchMember, AttendanceRecord } from "@/types/attendance";

interface MemberManagementTabProps {
  members: ChurchMember[];
}

export default function MemberManagementTab({ members }: MemberManagementTabProps) {
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<ChurchMember | null>(null);
  const [memberHistory, setMemberHistory] = useState<AttendanceRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase().trim();
    return (
      m.fullName.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q)
    );
  });

  const openMemberDetail = async (member: ChurchMember) => {
    setSelectedMember(member);
    try {
      setLoadingHistory(true);
      const res = await fetch(`/api/attendance/members?email=${encodeURIComponent(member.email)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setMemberHistory(json.data.history || []);
      }
    } catch (err) {
      console.error("Failed to fetch member history", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Member Directory</h2>
          <p className="text-xs text-zinc-400">
            Registered member roster with yearly attendance tracking and individual histories.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-appRed transition-colors"
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Member</th>
                <th className="pb-3 font-semibold">Member ID</th>
                <th className="pb-3 font-semibold">Contact</th>
                <th className="pb-3 font-semibold text-center">2026 Attendance</th>
                <th className="pb-3 font-semibold">Last Attended</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3.5 font-medium text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center text-appRed font-bold text-xs shrink-0">
                        {m.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{m.fullName}</div>
                        <div className="text-[11px] text-zinc-400">{m.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 font-mono text-zinc-300 font-semibold">{m.id}</td>

                  <td className="py-3.5 text-zinc-400">
                    <div>{m.phone || "—"}</div>
                  </td>

                  <td className="py-3.5 text-center">
                    <span className="font-mono font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {m.totalAttendancesYear} services
                    </span>
                  </td>

                  <td className="py-3.5 text-zinc-400 font-mono">
                    {m.lastAttendedDate || "Never"}
                  </td>

                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => openMemberDetail(m)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>History</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member History Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-appRed font-bold text-lg">
                  {selectedMember.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMember.fullName}</h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                    <span>{selectedMember.id}</span>
                    <span>•</span>
                    <span>{selectedMember.email}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* Attendance Stat Strip */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs">
              <div>
                <span className="text-zinc-500 block">Total Services Attended (2026)</span>
                <span className="text-lg font-bold text-amber-400 font-mono">
                  {selectedMember.totalAttendancesYear}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Last Check-In Date</span>
                <span className="text-lg font-bold text-white font-mono">
                  {selectedMember.lastAttendedDate || "N/A"}
                </span>
              </div>
            </div>

            {/* Attendance Log */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Attendance Timeline
              </h4>

              {loadingHistory ? (
                <div className="py-8 text-center text-zinc-500 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-appRed" />
                  <span>Loading attendance history...</span>
                </div>
              ) : memberHistory.length === 0 ? (
                <p className="text-xs text-zinc-500 py-4 text-center">
                  No individual attendance records logged for this member yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {memberHistory.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-white">{rec.serviceTitle}</div>
                        <div className="text-[11px] text-zinc-400">
                          {rec.serviceDate} • {new Date(rec.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          rec.attendanceType === "physical"
                            ? "bg-red-950/70 text-red-300 border border-red-500/30"
                            : "bg-blue-950/70 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {rec.attendanceType === "physical" ? "Physical" : "Online"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 text-center border-t border-zinc-800">
              <button
                onClick={() => setSelectedMember(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

