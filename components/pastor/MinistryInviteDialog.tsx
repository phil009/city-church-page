"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Calendar, User, Building2, Send, CheckCircle2 } from "lucide-react";

interface MinistryInviteDialogProps {
  triggerButton?: React.ReactNode;
}

export default function MinistryInviteDialog({
  triggerButton,
}: MinistryInviteDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    eventType: "Speaking / Ministering",
    date: "",
    location: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate sending / logging request
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Invitation sent successfully! Our team will reach out soon.");
      setTimeout(() => {
        setOpen(false);
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          eventType: "Speaking / Ministering",
          date: "",
          location: "",
          message: "",
        });
      }, 1500);
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button
            id="open-invite-dialog"
            variant="outline"
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white rounded-full px-6 py-2.5 transition-all text-sm font-semibold tracking-wide backdrop-blur-sm"
          >
            Speaking & Ministry Request
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] bg-zinc-950 border border-zinc-800 text-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-appRed bg-red-950/60 border border-red-500/20 px-3 py-1 rounded-full w-fit">
            Ministry Engagements
          </span>
          <DialogTitle className="text-2xl font-bold tracking-tight text-white">
            Invite Pastor Tony
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
            Interested in inviting Pastor Tony Aleogena Raphael to minister at
            your church, conference, or leadership summit? Please share your
            event details below.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Thank You!</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto">
              Your inquiry has been received. The City Church Calabar pastoral
              office will review your dates and connect with you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="inviter-name" className="text-xs text-zinc-300">
                  Your Full Name *
                </Label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="inviter-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Pastor David Udoh"
                    className="pl-9 bg-zinc-900/80 border-zinc-800 focus:border-appRed text-white text-sm h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inviter-org" className="text-xs text-zinc-300">
                  Church / Organization *
                </Label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="inviter-org"
                    required
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    placeholder="e.g. Grace Fellowship"
                    className="pl-9 bg-zinc-900/80 border-zinc-800 focus:border-appRed text-white text-sm h-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="inviter-email" className="text-xs text-zinc-300">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="inviter-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="contact@church.org"
                    className="pl-9 bg-zinc-900/80 border-zinc-800 focus:border-appRed text-white text-sm h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inviter-date" className="text-xs text-zinc-300">
                  Proposed Date(s)
                </Label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="inviter-date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="e.g. Nov 14–16, 2026"
                    className="pl-9 bg-zinc-900/80 border-zinc-800 focus:border-appRed text-white text-sm h-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inviter-msg" className="text-xs text-zinc-300">
                Brief Description of the Event / Theme
              </Label>
              <Textarea
                id="inviter-msg"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Share the purpose, expected audience size, and any theme details..."
                className="bg-zinc-900/80 border-zinc-800 focus:border-appRed text-white text-sm resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-appRed hover:bg-red-700 text-white font-semibold text-sm px-5 flex items-center gap-2 shadow-md"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
