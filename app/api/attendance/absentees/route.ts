import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let serviceId = searchParams.get("serviceId");

    if (!serviceId) {
      const active = AttendanceStore.getActiveService();
      if (active) {
        serviceId = active.id;
      } else {
        const services = AttendanceStore.getAllServices();
        if (services.length > 0) {
          serviceId = services[0].id;
        }
      }
    }

    if (!serviceId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const absentees = AttendanceStore.getAbsenteesForService(serviceId);
    return NextResponse.json({ success: true, serviceId, data: absentees });
  } catch (error) {
    console.error("Get absentees error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate absentee list." },
      { status: 500 }
    );
  }
}

