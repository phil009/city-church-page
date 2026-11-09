import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passcode } = body;

    const validPasscode = process.env.ATTENDANCE_ADMIN_PASSCODE || "citychurch2026";

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, message: "Admin passcode is required." },
        { status: 400 }
      );
    }

    if (passcode.trim() !== validPasscode.trim()) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator passcode." },
        { status: 401 }
      );
    }

    // Set an admin token / session marker
    return NextResponse.json({
      success: true,
      message: "Administrator authenticated successfully.",
      role: "admin",
      token: Buffer.from(`admin:${Date.now()}`).toString("base64"),
    });
  } catch (error) {
    console.error("Admin verify error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed." },
      { status: 500 }
    );
  }
}

