"use client";

import { Code, Smartphone, Check, Copy } from "lucide-react";
import { useState } from "react";

export default function ApiDocumentationTab() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      id: "check-in",
      method: "POST",
      path: "/api/attendance/check-in",
      description: "Registers member attendance for Sunday physical or online stream.",
      requestBody: `{
  "fullName": "Emmanuel Bassey",
  "email": "emmanuel@example.com",
  "phone": "+234 803 123 4567", // optional
  "verificationCode": "7429",
  "attendanceType": "physical", // "physical" | "online"
  "serviceId": "svc-2026-11-08-1" // optional, defaults to active service
}`,
      response: `{
  "success": true,
  "message": "Attendance successfully registered!",
  "data": {
    "record": {
      "id": "att-k9f4-21ab",
      "serviceId": "svc-2026-11-08-1",
      "serviceTitle": "Sunday 1st Service - Covenant Day of Praise",
      "memberId": "CC-MBR-0001",
      "memberName": "Emmanuel Bassey",
      "memberEmail": "emmanuel@example.com",
      "attendanceType": "physical",
      "checkInTime": "2026-11-08T09:12:30.000Z"
    },
    "member": {
      "id": "CC-MBR-0001",
      "fullName": "Emmanuel Bassey",
      "email": "emmanuel@example.com",
      "totalAttendancesYear": 39
    }
  }
}`,
    },
    {
      id: "get-services",
      method: "GET",
      path: "/api/attendance/services",
      description: "Fetches scheduled Sunday services, current active service, and service codes.",
      response: `{
  "success": true,
  "data": [
    {
      "id": "svc-2026-11-08-1",
      "title": "Sunday 1st Service - Covenant Day of Praise",
      "date": "2026-11-08",
      "startTime": "09:00",
      "closingTime": "12:30",
      "verificationCode": "7429",
      "status": "active",
      "venue": "The Big Tent, 98 Marian Road, Calabar"
    }
  ]
}`,
    },
    {
      id: "member-history",
      method: "GET",
      path: "/api/attendance/members?email=user@example.com",
      description: "Retrieves member profile and personal attendance history for the mobile app.",
      response: `{
  "success": true,
  "data": {
    "member": {
      "id": "CC-MBR-0001",
      "fullName": "Emmanuel Bassey",
      "email": "emmanuel@example.com",
      "totalAttendancesYear": 39,
      "lastAttendedDate": "2026-11-08"
    },
    "history": [
      {
        "serviceTitle": "Sunday 1st Service - Covenant Day of Praise",
        "serviceDate": "2026-11-08",
        "attendanceType": "physical",
        "checkInTime": "2026-11-08T09:12:30.000Z"
      }
    ]
  }
}`,
    },
    {
      id: "qr-generator",
      method: "GET",
      path: "/api/attendance/qr?serviceId=svc-1&type=physical",
      description: "Generates high-res QR code Data URL or PNG for in-app scanning or displays.",
      response: `{
  "success": true,
  "data": {
    "serviceId": "svc-1",
    "verificationCode": "7429",
    "type": "physical",
    "checkInUrl": "https://citychurchcalabar.org/attendance?serviceId=svc-1&type=physical&code=7429",
    "qrDataUrl": "data:image/png;base64,..."
  }
}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-2">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-appRed" />
          <h2 className="text-xl font-bold text-white">Mobile Application Integration API</h2>
        </div>
        <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
          The City Church Attendance backend exposes clean, structured REST endpoints to support future
          integration with the church&apos;s iOS and Android mobile applications. All endpoints return JSON
          with consistent status codes.
        </p>
      </div>

      {/* Endpoints List */}
      <div className="space-y-6">
        {endpoints.map((ep) => (
          <div
            key={ep.id}
            className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                    ep.method === "POST"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                      : "bg-blue-950 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-sm font-bold text-white">{ep.path}</span>
              </div>

              <button
                onClick={() => copySnippet(ep.path, ep.id)}
                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1"
              >
                {copiedEndpoint === ep.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedEndpoint === ep.id ? "Copied" : "Copy Path"}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-300">{ep.description}</p>

            {ep.requestBody && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                  Request Payload (JSON)
                </span>
                <pre className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                  {ep.requestBody}
                </pre>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                Sample Response (JSON)
              </span>
              <pre className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto">
                {ep.response}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

