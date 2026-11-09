import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";
import { AttendanceType } from "@/types/attendance";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, phone, verificationCode, attendanceType, serviceId } = body;

    // 1. Validate required information
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!verificationCode || typeof verificationCode !== "string") {
      return NextResponse.json(
        { success: false, message: "Service verification code is required." },
        { status: 400 }
      );
    }

    // Determine target service
    let targetServiceId = serviceId;
    if (!targetServiceId) {
      const activeService = AttendanceStore.getActiveService();
      if (!activeService) {
        return NextResponse.json(
          {
            success: false,
            message: "There is currently no active service open for attendance check-in.",
          },
          { status: 400 }
        );
      }
      targetServiceId = activeService.id;
    }

    const type: AttendanceType = attendanceType === "online" ? "online" : "physical";

    // 2. Process check-in through store
    const result = AttendanceStore.recordAttendance({
      serviceId: targetServiceId,
      fullName,
      email,
      phone,
      attendanceType: type,
      verificationCode,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: {
        record: result.record,
        member: result.member,
      },
    });
  } catch (error) {
    console.error("Attendance check-in error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while registering attendance." },
      { status: 500 }
    );
  }
}

