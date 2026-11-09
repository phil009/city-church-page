import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId");
    const format = searchParams.get("format") || "csv";

    const records = AttendanceStore.getAttendanceRecords(serviceId || undefined);

    if (format === "json") {
      return NextResponse.json({ success: true, count: records.length, data: records });
    }

    // Build CSV header & rows
    const headers = [
      "Record ID",
      "Member ID",
      "Full Name",
      "Email Address",
      "Service Date",
      "Service Title",
      "Attendance Type",
      "Verification Code Used",
      "Check-in Timestamp (ISO)",
      "Local Time",
    ];

    const escapeCsv = (val: string | undefined | null) => {
      if (!val) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = records.map((r) => [
      escapeCsv(r.id),
      escapeCsv(r.memberId),
      escapeCsv(r.memberName),
      escapeCsv(r.memberEmail),
      escapeCsv(r.serviceDate),
      escapeCsv(r.serviceTitle),
      escapeCsv(r.attendanceType.toUpperCase()),
      escapeCsv(r.verificationCodeUsed),
      escapeCsv(r.checkInTime),
      escapeCsv(new Date(r.checkInTime).toLocaleString()),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

    const filename = serviceId
      ? `city-church-attendance-${serviceId}.csv`
      : `city-church-attendance-full-report-${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Export attendance error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to export attendance records." },
      { status: 500 }
    );
  }
}

