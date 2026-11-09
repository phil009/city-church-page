"use client";

import { Users, MapPin, Radio, Activity, Calendar, ArrowUpRight, CheckCircle2, Monitor } from "lucide-react";
import { AttendanceStats, ChurchService } from "@/types/attendance";

interface AttendanceOverviewTabProps {
  stats: AttendanceStats & {
    totalRegisteredMembers?: number;
    trends?: Array<{
      serviceId: string;
      title: string;
      date: string;
      total: number;
      physical: number;
      online: number;
    }>;
  };
  onOpenPresenter: (service: ChurchService) => void;
  onNavigateTab: (tabId: string) => void;
}

export default function AttendanceOverviewTab({
  stats,
  onOpenPresenter,
  onNavigateTab,
}: AttendanceOverviewTabProps) {
  const activeService = stats.activeService;
  const recentAttendance = stats.recentAttendance || [];
  const trends = stats.trends || [];

  return (
    <div className="space-y-8">
      {/* Active Service Banner */}
      {activeService ? (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-zinc-900 border border-red-500/30 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Live Attendance Window Active
              </span>
              <span className="text-xs text-zinc-400">• {activeService.date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{activeService.title}</h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              Verification Code:{" "}
              <span className="font-mono font-bold text-amber-400 text-base sm:text-lg bg-black/40 px-2 py-0.5 rounded border border-amber-500/20">
                {activeService.verificationCode}
              </span>
              {" • "}Window: {activeService.startTime} - {activeService.closingTime}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenPresenter(activeService)}
              className="w-full md:w-auto px-5 py-3 rounded-2xl bg-appRed hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
            >
              <Monitor className="w-4 h-4" />
              <span>Projector / Screen Mode</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs sm:text-sm flex items-center justify-between">
          <span>No service is currently active for attendance check-in.</span>
          <button
            onClick={() => onNavigateTab("services")}
            className="text-appRed hover:underline font-semibold"
          >
            Create or Activate a Service &rarr;
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Attendance */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            <span>Total Attendance</span>
            <Users className="w-4 h-4 text-appRed" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.totalAttendance}</div>
          <p className="text-[11px] text-zinc-400">
            For {activeService ? "current active service" : "selected service"}
          </p>
        </div>

        {/* Physical Attendance */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            <span>Physical In-Person</span>
            <MapPin className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.physicalCount}</div>
          <p className="text-[11px] text-zinc-400">At The Big Tent Sanctuary</p>
        </div>

        {/* Online Attendance */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            <span>Online Stream</span>
            <Radio className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.onlineCount}</div>
          <p className="text-[11px] text-zinc-400">Livestream viewers verified</p>
        </div>

        {/* Total Registered Members */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            <span>Registered Roster</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {stats.totalRegisteredMembers || 10}
          </div>
          <p className="text-[11px] text-zinc-400">Total unique church member profiles</p>
        </div>
      </div>

      {/* Attendance Trends */}
      {trends.length > 0 && (
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Attendance Trends</h3>
              <p className="text-xs text-zinc-400">Breakdown across recent Sunday services</p>
            </div>
            <span className="text-xs text-zinc-500 font-mono">Past {trends.length} services</span>
          </div>

          <div className="space-y-3 pt-2">
            {trends.map((item) => {
              const maxVal = Math.max(...trends.map((t) => t.total), 1);
              const percent = Math.round((item.total / maxVal) * 100);
              return (
                <div key={item.serviceId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white truncate max-w-xs">{item.title}</span>
                    <span className="text-zinc-400 font-mono">
                      {item.total} attendees ({item.physical} physical, {item.online} online)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-zinc-900 overflow-hidden flex">
                    <div
                      style={{
                        width: `${item.total > 0 ? (item.physical / item.total) * percent : 0}%`,
                      }}
                      className="bg-appRed h-full transition-all duration-500"
                      title={`Physical: ${item.physical}`}
                    />
                    <div
                      style={{
                        width: `${item.total > 0 ? (item.online / item.total) * percent : 0}%`,
                      }}
                      className="bg-blue-600 h-full transition-all duration-500"
                      title={`Online: ${item.online}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-zinc-900">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-appRed" />
              <span>Physical Attendance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Online Stream Attendance</span>
            </span>
          </div>
        </div>
      )}

      {/* Live Incoming Attendance Feed */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Recent Check-Ins</span>
            </h3>
            <p className="text-xs text-zinc-400">Incoming member check-in stream</p>
          </div>
          <span className="text-xs text-zinc-500">{recentAttendance.length} records</span>
        </div>

        {recentAttendance.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6 text-center">No check-ins recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">Member</th>
                  <th className="pb-3 font-semibold">Member ID</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {recentAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 font-medium text-white">
                      <div>{rec.memberName}</div>
                      <div className="text-[11px] text-zinc-400">{rec.memberEmail}</div>
                    </td>
                    <td className="py-3 font-mono text-zinc-300">{rec.memberId}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          rec.attendanceType === "physical"
                            ? "bg-red-950/70 text-red-300 border border-red-500/30"
                            : "bg-blue-950/70 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {rec.attendanceType === "physical" ? "Physical" : "Online"}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-400 truncate max-w-xs">{rec.serviceTitle}</td>
                    <td className="py-3 text-right text-zinc-400 font-mono">
                      {new Date(rec.checkInTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

