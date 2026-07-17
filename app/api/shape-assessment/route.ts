import { NextRequest, NextResponse } from "next/server";

interface AirtableError {
    error?: { message?: string };
}

export async function POST(request: NextRequest) {
    try {
        const { firstName, lastName, email, phone } = await request.json();

        const fields: Record<string, unknown> = {
            "First Name": firstName,
            "Last Name": lastName,
            Email: email,
            "Submission Date": new Date().toISOString(),
            Status: "New",
        };
        if (phone) fields["Phone"] = phone;

        const response = await fetch(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_SHAPE_BASE_ID}/${process.env.AIRTABLE_SHAPE_TABLE_ID}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ typecast: true, records: [{ fields }] }),
            },
        );

        if (!response.ok) {
            const error: AirtableError = await response.json();
            console.error("Airtable error:", error);
            return NextResponse.json(
                { error: error.error?.message ?? "Failed to submit" },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Failed to submit form" },
            { status: 500 },
        );
    }
}
