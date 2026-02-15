// app/api/join-unit/route.ts
import { NextRequest, NextResponse } from "next/server";

interface AirtableError {
    error?: {
        message?: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    records: [
                        {
                            fields: body,
                        },
                    ],
                }),
            },
        );

        if (!response.ok) {
            const error: AirtableError = await response.json();
            console.error("Airtable error:", error);
            return NextResponse.json(
                { error: error.error?.message || "Failed to submit" },
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
