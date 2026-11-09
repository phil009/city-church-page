import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = AttendanceStore.getServiceById(id);
    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("Get service error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch service." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = AttendanceStore.updateService(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Service not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update service." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = AttendanceStore.deleteService(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Service not found or could not be deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Service deleted successfully." });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete service." },
      { status: 500 }
    );
  }
}

