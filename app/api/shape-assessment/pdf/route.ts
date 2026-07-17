import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { recordId, pdfBase64, firstName, lastName } = await request.json();

    if (!recordId || !pdfBase64 || !process.env.AIRTABLE_SHAPE_PDF_FIELD_ID) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");
    const filename = `SHAPE-${firstName ?? "Assessment"}-${lastName ?? ""}.pdf`.trim();

    const response = await fetch(
      `https://content.airtable.com/v0/${process.env.AIRTABLE_SHAPE_BASE_ID}/${recordId}/${process.env.AIRTABLE_SHAPE_PDF_FIELD_ID}/uploadAttachment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: "application/pdf",
          file: base64Data,
          filename,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Airtable attachment upload failed:", error);
      return NextResponse.json({ error: "Upload failed" }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PDF upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
