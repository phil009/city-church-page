import { NextRequest, NextResponse } from "next/server";
import { computeMinistryMatches } from "@/lib/shape-assessment/scoring";

interface AirtableError {
  error?: { message?: string };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      spiritualGifts,
      passions,
      people,
      causes,
      heartServing,
      abilities,
      disc,
      p16,
      expEducation,
      expMinistry,
      expPainful,
      expSpiritual,
      additionalComments,
      topGifts,
      discScores,
      primaryDiscType,
      p16Code,
    } = body;

    const matches = computeMinistryMatches(
      (topGifts ?? []).map((g: { name: string }) => g.name),
      primaryDiscType,
      p16Code,
      passions ?? [],
      people ?? [],
      causes ?? [],
      abilities ?? [],
    );

    const fields: Record<string, unknown> = {
      "First Name": firstName,
      "Last Name": lastName,
      Email: email,
      "Submission Date": new Date().toISOString(),
      Status: "New",
      "Top Spiritual Gifts": (topGifts ?? [])
        .map((g: { name: string; score: number }) => `${g.name} (${g.score})`)
        .join(", "),
      "DISC Primary Type": primaryDiscType,
      "DISC Scores": discScores
        ? `D:${discScores.D} I:${discScores.I} S:${discScores.S} C:${discScores.C}`
        : undefined,
      "16 Personalities Code": p16Code,
      Passions: (passions ?? []).join(", "),
      "People Groups": (people ?? []).join(", "),
      Causes: (causes ?? []).join(", "),
      "Heart for Serving": heartServing,
      Abilities: (abilities ?? []).join(", "),
      "Top Ministry Matches": matches
        .map((m) => `${m.unit.name} (${m.pct}%)`)
        .join(", "),
      "Experience - Education": expEducation,
      "Experience - Ministry": expMinistry,
      "Experience - Painful": expPainful,
      "Experience - Spiritual": expSpiritual,
      "Additional Comments": additionalComments,
      "Raw Assessment Data": JSON.stringify({
        spiritualGifts,
        disc,
        p16,
      }),
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
