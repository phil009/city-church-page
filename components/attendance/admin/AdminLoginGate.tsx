"use client";

import { useState } from "react";
import { Lock, ShieldAlert, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface AdminLoginGateProps {
  onAuthenticated: () => void;
}

export default function AdminLoginGate({ onAuthenticated }: AdminLoginGateProps) {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!passcode.trim()) {
      setError("Please enter the administrator passcode.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/attendance/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid passcode.");
        return;
      }

      // Store in session storage
      sessionStorage.setItem("city_church_admin_token", data.token);
      onAuthenticated();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-appRed mx-auto shadow-lg shadow-red-950/40">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            Admin Portal Access
          </h2>
          <p className="text-xs text-zinc-400">
            Enter the church administrative passcode to access attendance records, service manager, and absentee monitoring.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Passcode
            </label>
            <input
              type="password"
              required
              placeholder="Enter admin passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-appRed transition-colors text-center tracking-widest font-mono text-lg"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-appRed hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Unlock Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-zinc-500 pt-1">
            Authorized pastoral and administrative personnel only.
          </p>
        </form>
      </div>
    </div>
  );
}

