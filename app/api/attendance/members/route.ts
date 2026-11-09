import { NextRequest, NextResponse } from "next/server";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim();
    const email = searchParams.get("email")?.toLowerCase().trim();

    if (email) {
      const member = AttendanceStore.getMemberByEmail(email);
      if (!member) {
        return NextResponse.json({ success: false, message: "Member not found." }, { status: 404 });
      }
      const history = AttendanceStore.getAttendanceRecords().filter((a) => a.memberId === member.id);
      return NextResponse.json({ success: true, data: { member, history } });
    }

    let members = AttendanceStore.getAllMembers();

    if (search) {
      members = members.filter(
        (m) =>
          m.fullName.toLowerCase().includes(search) ||
          m.email.toLowerCase().includes(search) ||
          m.id.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Get members error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch members." },
      { status: 500 }
    );
  }
}

