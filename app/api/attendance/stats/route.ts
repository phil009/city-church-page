import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId") || undefined;

    const stats = AttendanceStore.getStats(serviceId);
    const services = AttendanceStore.getAllServices();
    const members = AttendanceStore.getAllMembers();

    // Compute historical trends across services
    const trends = services.slice(0, 8).map((svc) => {
      const records = AttendanceStore.getAttendanceRecords(svc.id);
      const physical = records.filter((r) => r.attendanceType === "physical").length;
      const online = records.filter((r) => r.attendanceType === "online").length;
      return {
        serviceId: svc.id,
        title: svc.title,
        date: svc.date,
        total: records.length,
        physical,
        online,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        totalRegisteredMembers: members.length,
        trends,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load attendance statistics." },
      { status: 500 }
    );
  }
}

