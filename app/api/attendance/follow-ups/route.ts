import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET() {
  try {
    const followUps = AttendanceStore.getFollowUps();
    const templates = AttendanceStore.getTemplates();
    return NextResponse.json({ success: true, data: { followUps, templates } });
  } catch (error) {
    console.error("Get follow-ups error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch follow-ups." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memberId, serviceId, templateId, subject, messageContent } = body;

    if (!memberId || !serviceId || !templateId) {
      return NextResponse.json(
        { success: false, message: "Member, Service, and Template are required." },
        { status: 400 }
      );
    }

    const result = AttendanceStore.createFollowUp({
      memberId,
      serviceId,
      templateId,
      subject: subject || "We missed you at City Church",
      messageContent: messageContent || "",
    });

    if ("error" in result) {
      return NextResponse.json({ success: false, message: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Create follow-up error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create follow-up." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Follow-up ID and new status are required." },
        { status: 400 }
      );
    }

    const updated = AttendanceStore.updateFollowUpStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Follow-up record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update follow-up error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update follow-up." },
      { status: 500 }
    );
  }
}

