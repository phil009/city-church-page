import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // If Airtable is configured, forward the record
    if (
      process.env.AIRTABLE_API_KEY &&
      process.env.AIRTABLE_BUSINESS_HUB_BASE_ID &&
      process.env.AIRTABLE_BUSINESS_HUB_TABLE_ID
    ) {
      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${process.env.AIRTABLE_BUSINESS_HUB_BASE_ID}/${process.env.AIRTABLE_BUSINESS_HUB_TABLE_ID}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              typecast: true,
              records: [
                {
                  fields: {
                    "Business Name": body.name,
                    "Category": body.category,
                    "Tagline": body.tagline,
                    "Description": body.description,
                    "Owner Name": body.churchEngagement?.ownerName,
                    "Church Fellowship": body.churchEngagement?.unitOrFellowship,
                    "Member Offer": body.memberDiscount?.title,
                    "Phone": body.contact?.phone,
                    "WhatsApp": body.contact?.whatsapp,
                    "Email": body.contact?.email || "",
                    "Address": body.location?.address,
                    "Area": body.location?.area || "",
                    "Status": "Pending Review",
                  },
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const err = await response.json();
          console.error("Airtable sync warning:", err);
        }
      } catch (airtableErr) {
        console.warn("Airtable forwarding skipped:", airtableErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Business successfully submitted for ACCELER8 review and listing.",
      business: body,
    });
  } catch (error) {
    console.error("Business registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit business details." },
      { status: 500 }
    );
  }
}
