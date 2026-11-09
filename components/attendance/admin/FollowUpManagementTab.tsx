"use client";

import { useState } from "react";
import {
  Mail,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  AlertCircle,
  FileText,
  User,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { FollowUpRecord, FollowUpTemplate, FollowUpStatus } from "@/types/attendance";

interface FollowUpManagementTabProps {
  followUps: FollowUpRecord[];
  templates: FollowUpTemplate[];
  onRefresh: () => void;
}

export default function FollowUpManagementTab({
  followUps,
  templates,
  onRefresh,
}: FollowUpManagementTabProps) {
  const [selectedItem, setSelectedItem] = useState<FollowUpRecord | null>(null);
  const [updating, setUpdating] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templates.length > 0 ? templates[0].id : ""
  );

  const handleUpdateStatus = async (id: string, status: FollowUpStatus) => {
    try {
      setUpdating(true);
      const res = await fetch("/api/attendance/follow-ups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setSelectedItem(null);
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdating(false);
    }
  };

  const previewTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Pastoral Follow-Up System</h2>
        <p className="text-xs text-zinc-400">
          Review, approve, and record pastoral communications sent to absent members.
        </p>
      </div>

      {/* Predefined Templates Drawer / Cards */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-appRed" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Predefined Pastoral Templates
            </h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">{templates.length} templates configured</span>
        </div>

        {/* Template Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setSelectedTemplateId(tpl.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedTemplateId === tpl.id
                  ? "bg-red-950/40 border-red-500 text-white shadow-lg shadow-red-950/30"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{tpl.title}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5 truncate">{tpl.subject}</div>
              <span className="inline-block text-[10px] text-amber-400/80 font-mono mt-1">
                Trigger: {tpl.triggerCondition}
              </span>
            </button>
          ))}
        </div>

        {/* Active Template Preview */}
        {previewTemplate && (
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-300 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
              <span className="font-semibold text-white">Template Subject: {previewTemplate.subject}</span>
              <span className="text-[11px] text-emerald-400">Auto-injects member name: &#123;&#123;name&#125;&#125;</span>
            </div>
            <pre className="font-sans whitespace-pre-line text-zinc-300 text-xs leading-relaxed max-h-40 overflow-y-auto">
              {previewTemplate.body}
            </pre>
          </div>
        )}
      </div>

      {/* Follow-up Queue & History */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
          <span className="font-semibold text-white">
            Follow-Up Queue & Log ({followUps.length} items)
          </span>
          <span className="text-zinc-500 text-[11px]">
            Duplicates for the same service absence are automatically prevented
          </span>
        </div>

        {followUps.length === 0 ? (
          <p className="text-xs text-zinc-500 py-8 text-center">
            No follow-up messages queued yet. Go to Absentee Monitoring to initiate follow-ups for members who missed Sunday service.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 font-semibold">Recipient</th>
                  <th className="py-3 font-semibold">Service</th>
                  <th className="py-3 font-semibold">Subject</th>
                  <th className="py-3 font-semibold text-center">Review Status</th>
                  <th className="py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {followUps.map((flw) => (
                  <tr key={flw.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3.5 font-medium text-white">
                      <div className="font-bold text-white text-sm">{flw.memberName}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">{flw.memberEmail}</div>
                    </td>

                    <td className="py-3.5 text-zinc-400 truncate max-w-xs">{flw.serviceTitle}</td>

                    <td className="py-3.5 text-zinc-300 truncate max-w-xs">{flw.subject}</td>

                    <td className="py-3.5 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          flw.status === "sent"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                            : flw.status === "approved"
                            ? "bg-blue-950 text-blue-300 border border-blue-500/30"
                            : "bg-amber-950 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {flw.status === "sent" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : flw.status === "approved" ? (
                          <ShieldCheck className="w-3 h-3 text-blue-400" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{flw.status.replace("_", " ")}</span>
                      </span>
                    </td>

                    <td className="py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        {flw.status === "pending_review" && (
                          <button
                            onClick={() => handleUpdateStatus(flw.id, "approved")}
                            className="px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900 text-blue-300 border border-blue-500/30 text-[11px] font-semibold transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {flw.status !== "sent" && (
                          <button
                            onClick={() => handleUpdateStatus(flw.id, "sent")}
                            className="px-3 py-1 rounded-lg bg-appRed hover:bg-red-700 text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Mark Sent</span>
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedItem(flw)}
                          className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px]"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Preview Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Review Follow-Up Notification</h3>
                <p className="text-xs text-zinc-400">Recipient: {selectedItem.memberName} ({selectedItem.memberEmail})</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 block text-[11px]">Subject</span>
                <span className="font-semibold text-white">{selectedItem.subject}</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="text-zinc-500 block text-[11px]">Message Body</span>
                <p className="whitespace-pre-line text-zinc-300 leading-relaxed font-sans">
                  {selectedItem.messageContent}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
              <span className="text-[11px] text-zinc-500 font-mono">
                Status: {selectedItem.status}
              </span>

              <div className="flex items-center gap-2">
                {selectedItem.status !== "sent" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedItem.id, "sent")}
                    disabled={updating}
                    className="px-4 py-2 rounded-xl bg-appRed hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-red-950/40"
                  >
                    {updating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Approve & Dispatch</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-3 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

