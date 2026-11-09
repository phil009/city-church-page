import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { AttendanceStore } from "@/lib/attendance/attendance-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId");
    const type = (searchParams.get("type") || "physical") as "physical" | "online";
    const format = searchParams.get("format") || "json";

    let service = serviceId ? AttendanceStore.getServiceById(serviceId) : AttendanceStore.getActiveService();

    if (!service) {
      const all = AttendanceStore.getAllServices();
      service = all[0];
    }

    if (!service) {
      return NextResponse.json({ success: false, message: "No service found." }, { status: 404 });
    }

    // Determine base URL
    const host = request.headers.get("host") || "citychurchcalabar.org";
    const protocol = host.includes("localhost") ? "http" : "https";
    const checkInUrl = `${protocol}://${host}/attendance?serviceId=${encodeURIComponent(
      service.id
    )}&type=${type}&code=${encodeURIComponent(service.verificationCode)}`;

    // Generate QR Data URL
    const qrDataUrl = await QRCode.toDataURL(checkInUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: type === "physical" ? "#991b1b" : "#1e40af", // appRed or Deep Blue
        light: "#ffffff",
      },
    });

    if (format === "png") {
      const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": `inline; filename="qr-${service.id}-${type}.png"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        serviceId: service.id,
        serviceTitle: service.title,
        verificationCode: service.verificationCode,
        type,
        checkInUrl,
        qrDataUrl,
      },
    });
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate QR code." },
      { status: 500 }
    );
  }
}

