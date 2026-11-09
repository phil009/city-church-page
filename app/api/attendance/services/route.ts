import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET() {
  try {
    const services = AttendanceStore.getAllServices();
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Fetch services error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load services." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, date, startTime, closingTime, verificationCode, status, description, venue } = body;

    if (!title || !date || !startTime || !closingTime || !verificationCode) {
      return NextResponse.json(
        { success: false, message: "All required service fields must be filled." },
        { status: 400 }
      );
    }

    if (verificationCode.length < 4 || verificationCode.length > 5) {
      return NextResponse.json(
        { success: false, message: "Verification code must be 4 or 5 digits." },
        { status: 400 }
      );
    }

    const created = AttendanceStore.createService({
      title,
      date,
      startTime,
      closingTime,
      verificationCode,
      status: status || "active",
      description,
      venue: venue || "The Big Tent, 98 Marian Road, Calabar",
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create service." },
      { status: 500 }
    );
  }
}

