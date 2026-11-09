"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  UserX,
  Mail,
  FileSpreadsheet,
  Monitor,
  Code,
  Lock,
  LogOut,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import AdminLoginGate from "@/components/attendance/admin/AdminLoginGate";
import AttendanceOverviewTab from "@/components/attendance/admin/AttendanceOverviewTab";
import ServiceManagementTab from "@/components/attendance/admin/ServiceManagementTab";
import MemberManagementTab from "@/components/attendance/admin/MemberManagementTab";
import AbsenteeMonitoringTab from "@/components/attendance/admin/AbsenteeMonitoringTab";
import FollowUpManagementTab from "@/components/attendance/admin/FollowUpManagementTab";
import ReportsExportTab from "@/components/attendance/admin/ReportsExportTab";
import ApiDocumentationTab from "@/components/attendance/admin/ApiDocumentationTab";
import ScreenPresenterModal from "@/components/attendance/admin/ScreenPresenterModal";
import { ChurchService, ChurchMember, FollowUpRecord, FollowUpTemplate, AbsenteeRecord } from "@/types/attendance";

type TabId = "overview" | "services" | "members" | "absentees" | "followups" | "reports" | "api";

export default function AdminAttendancePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Data states
  const [stats, setStats] = useState<any>({
    totalAttendance: 0,
    physicalCount: 0,
    onlineCount: 0,
    serviceCount: 0,
    activeService: null,
    recentAttendance: [],
  });
  const [services, setServices] = useState<ChurchService[]>([]);
  const [members, setMembers] = useState<ChurchMember[]>([]);
  const [followUps, setFollowUps] = useState<FollowUpRecord[]>([]);
  const [templates, setTemplates] = useState<FollowUpTemplate[]>([]);

  // Screen Presenter Modal
  const [presenterService, setPresenterService] = useState<ChurchService | null>(null);

  // Check existing session
  useEffect(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("city_church_admin_token") : null;
    if (token) {
      setAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  const loadAllData = async () => {
    try {
      const [statsRes, servicesRes, membersRes, followUpsRes] = await Promise.all([
        fetch("/api/attendance/stats"),
        fetch("/api/attendance/services"),
        fetch("/api/attendance/members"),
        fetch("/api/attendance/follow-ups"),
      ]);

      const [statsData, servicesData, membersData, followUpsData] = await Promise.all([
        statsRes.json(),
        servicesRes.json(),
        membersRes.json(),
        followUpsRes.json(),
      ]);

      if (statsData.success) setStats(statsData.data);
      if (servicesData.success) setServices(servicesData.data);
      if (membersData.success) setMembers(membersData.data);
      if (followUpsData.success && followUpsData.data) {
        setFollowUps(followUpsData.data.followUps || []);
        setTemplates(followUpsData.data.templates || []);
      }
    } catch (err) {
      console.error("Failed to load admin data", err);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadAllData();
    }
  }, [authenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem("city_church_admin_token");
    setAuthenticated(false);
  };

  // Callback from Absentee tab to queue follow-up
  const handleQueueFollowUp = async (absentee: AbsenteeRecord, serviceId: string) => {
    // Select appropriate template based on consecutive count
    let tpl = templates[0];
    if (absentee.consecutiveAbsences === 2 && templates[1]) {
      tpl = templates[1];
    } else if (absentee.consecutiveAbsences >= 3 && templates[2]) {
      tpl = templates[2];
    }

    if (!tpl) return;

    const populatedBody = tpl.body.replace(/\{\{name\}\}/g, absentee.fullName);

    try {
      const res = await fetch("/api/attendance/follow-ups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: absentee.memberId,
          serviceId,
          templateId: tpl.id,
          subject: tpl.subject,
          messageContent: populatedBody,
        }),
      });

      const data = await res.json();
      if (data.success) {
        await loadAllData();
        setActiveTab("followups");
      } else {
        alert(data.message || "Could not queue follow-up.");
      }
    } catch {
      alert("Error queueing follow-up.");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 text-sm">
        Checking admin authentication...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-black text-white pt-24 pb-12">
        <AdminLoginGate onAuthenticated={() => setAuthenticated(true)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-appRed selection:text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/70 border border-red-500/30 px-3 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Administrative Console</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              City Church Attendance Portal
            </h1>
            <p className="text-xs text-zinc-400">
              Sunday service QR code management, live check-ins, absentee monitoring, and pastoral care.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {stats.activeService && (
              <button
                onClick={() => setPresenterService(stats.activeService)}
                className="px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/30 text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-red-950/30"
              >
                <Monitor className="w-4 h-4 text-appRed" />
                <span>Screen Presenter Mode</span>
              </button>
            )}

            <Link
              href="/attendance"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-semibold flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Check-In</span>
            </Link>

            <button
              onClick={loadAllData}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-red-400 font-semibold flex items-center gap-1.5 transition-colors"
              title="Lock Admin Portal"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-900 text-xs">
          {[
            { id: "overview", label: "Overview", icon: Users },
            { id: "services", label: "Service Management", icon: Calendar },
            { id: "members", label: "Member Directory", icon: Users },
            { id: "absentees", label: "Absentee Monitoring", icon: UserX },
            { id: "followups", label: "Follow-Up System", icon: Mail },
            { id: "reports", label: "Reports & Export", icon: FileSpreadsheet },
            { id: "api", label: "Mobile API Docs", icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-appRed text-white shadow-lg shadow-red-950/40"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 border border-zinc-850"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        {activeTab === "overview" && (
          <AttendanceOverviewTab
            stats={stats}
            onOpenPresenter={(svc) => setPresenterService(svc)}
            onNavigateTab={(tab) => setActiveTab(tab as TabId)}
          />
        )}

        {activeTab === "services" && (
          <ServiceManagementTab
            services={services}
            onRefresh={loadAllData}
            onOpenPresenter={(svc) => setPresenterService(svc)}
          />
        )}

        {activeTab === "members" && <MemberManagementTab members={members} />}

        {activeTab === "absentees" && (
          <AbsenteeMonitoringTab
            services={services}
            onQueueFollowUp={handleQueueFollowUp}
          />
        )}

        {activeTab === "followups" && (
          <FollowUpManagementTab
            followUps={followUps}
            templates={templates}
            onRefresh={loadAllData}
          />
        )}

        {activeTab === "reports" && <ReportsExportTab services={services} stats={stats} />}

        {activeTab === "api" && <ApiDocumentationTab />}
      </div>

      {/* Screen Presenter Mode Modal */}
      {presenterService && (
        <ScreenPresenterModal
          service={presenterService}
          onClose={() => setPresenterService(null)}
        />
      )}
    </main>
  );
}

