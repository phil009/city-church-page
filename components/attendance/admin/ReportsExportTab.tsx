"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, Calendar, MapPin, Radio, TrendingUp, BarChart3, Check } from "lucide-react";
import { ChurchService, AttendanceStats } from "@/types/attendance";

interface ReportsExportTabProps {
  services: ChurchService[];
  stats: AttendanceStats & {
    trends?: Array<{
      serviceId: string;
      title: string;
      date: string;
      total: number;
      physical: number;
      online: number;
    }>;
  };
}

export default function ReportsExportTab({ services, stats }: ReportsExportTabProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCsv = () => {
    setDownloading(true);
    const url = selectedServiceId
      ? `/api/attendance/reports/export?serviceId=${encodeURIComponent(selectedServiceId)}`
      : `/api/attendance/reports/export`;

    // Trigger download in browser
    window.location.href = url;
    setTimeout(() => setDownloading(false), 2000);
  };

  const trends = stats.trends || [];
  const totalPhysical = trends.reduce((acc, curr) => acc + curr.physical, 0);
  const totalOnline = trends.reduce((acc, curr) => acc + curr.online, 0);
  const combinedTotal = totalPhysical + totalOnline;

  const physicalPercent = combinedTotal > 0 ? Math.round((totalPhysical / combinedTotal) * 100) : 0;
  const onlinePercent = combinedTotal > 0 ? Math.round((totalOnline / combinedTotal) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Attendance Analytics & Reports</h2>
        <p className="text-xs text-zinc-400">
          Weekly, monthly, and yearly attendance comparisons with instant CSV export for church leadership.
        </p>
      </div>

      {/* Export Action Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Export Attendance Data (CSV / Excel)
              </h3>
            </div>
            <p className="text-xs text-zinc-400">
              Download clean attendance rosters including Member IDs, names, dates, categories, and timestamps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-appRed"
            >
              <option value="">Full Master Report (All Services)</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.date} — {s.title}
                </option>
              ))}
            </select>

            <button
              onClick={handleDownloadCsv}
              disabled={downloading}
              className="px-6 py-2.5 rounded-xl bg-appRed hover:bg-red-700 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Preparing File..." : "Download CSV"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Grid: Physical vs Online */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ratio Card */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-appRed" />
              <span>Physical vs Online Attendance Ratio</span>
            </h3>
            <span className="text-xs text-zinc-500 font-mono">Recent Services</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-appRed" />
                <span>Physical In-Person ({totalPhysical} attendees)</span>
              </span>
              <span className="font-mono font-bold text-white text-sm">{physicalPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-zinc-900 overflow-hidden">
              <div
                style={{ width: `${physicalPercent}%` }}
                className="h-full bg-appRed rounded-full transition-all duration-700"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <span>Online Stream ({totalOnline} attendees)</span>
              </span>
              <span className="font-mono font-bold text-white text-sm">{onlinePercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-zinc-900 overflow-hidden">
              <div
                style={{ width: `${onlinePercent}%` }}
                className="h-full bg-blue-600 rounded-full transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Attendance Summaries</span>
          </h3>

          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Yearly Cumulative Check-Ins</span>
                <span className="text-zinc-500 text-[11px]">Logged across all services in 2026</span>
              </div>
              <span className="text-xl font-bold font-mono text-amber-400">{combinedTotal}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Average Attendance Per Service</span>
                <span className="text-zinc-500 text-[11px]">Combined in-person & online streams</span>
              </div>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {trends.length > 0 ? Math.round(combinedTotal / trends.length) : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

