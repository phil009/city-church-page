import { NextRequest, NextResponse } from "next/server";

interface AirtableError {
    error?: {
        message?: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fields: Record<string, any> = {
            "Full Name": body.name,
            "Phone Number (Whatsapp)": body.phone,
            "Email Address": body.email,
            "Current Department/Unit in Church": body.department,
            "Area of Service": body.role,
            "Platforms Used": body.platformsUsed,
            "Weekly Availability": body.weeklyAvailability,
            "Represent Church with Integrity": body.representWithIntegrity,
        };

        if (body.communityCount) {
            fields["How many online communities do you belong to?"] =
                body.communityCount;
        }
        if (body.communityTypes?.length) {
            fields["What type of communities do you belong to?"] =
                body.communityTypes;
        }
        if (body.activeInCommunities) {
            fields["Are you active in those communities?"] =
                body.activeInCommunities;
        }
        if (body.communityPlatforms?.length) {
            fields["What platforms are these communities on?"] =
                body.communityPlatforms;
        }
        if (body.creatorSkills?.length) {
            fields["Creator Skills"] = body.creatorSkills;
        }
        if (body.portfolioLink) {
            fields["Portfolio Link"] = body.portfolioLink;
        }

        const response = await fetch(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_DDS_TABLE_ID}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    typecast: true,
                    records: [{ fields }],
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
