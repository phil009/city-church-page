import { NextRequest, NextResponse } from "next/server";
import { GIFT_CATEGORIES } from "@/data/shape-data";

interface AirtableError {
  error?: { message?: string };
}

type DiscKey = "D" | "I" | "S" | "C";

function computeGiftScores(spiritualGifts: Record<string, number>) {
  return GIFT_CATEGORIES.map((cat) => ({
    name: cat.name,
    total: (cat.questions as readonly number[]).reduce(
      (sum, q) => sum + (spiritualGifts[String(q)] ?? 0),
      0
    ),
  })).sort((a, b) => b.total - a.total);
}

function computeDISCScores(disc: Record<string, string>) {
  const scores: Record<DiscKey, number> = { D: 0, I: 0, S: 0, C: 0 };
  Object.values(disc).forEach((v) => {
    if (v in scores) scores[v as DiscKey]++;
  });
  return scores;
}

function getPrimaryDisc(scores: Record<DiscKey, number>): string {
  const labels: Record<DiscKey, string> = {
    D: "D – Dominant",
    I: "I – Influencing",
    S: "S – Steady",
    C: "C – Careful",
  };
  const primary = (Object.keys(scores) as DiscKey[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );
  return labels[primary];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const giftScores   = computeGiftScores(body.spiritualGifts ?? {});
    const discScores   = computeDISCScores(body.disc ?? {});
    const primaryDisc  = getPrimaryDisc(discScores);

    const fields: Record<string, unknown> = {
      "Full Name":                    `${body.firstName ?? ""} ${body.lastName ?? ""}`.trim(),
      "Email":                        body.email,
      "Submission Date":              new Date().toISOString(),
      "Status":                       "New",
      "Top Gift 1":                   giftScores[0]?.name ?? "",
      "Top Gift 2":                   giftScores[1]?.name ?? "",
      "Top Gift 3":                   giftScores[2]?.name ?? "",
      "Spiritual Gifts Scores (All)": giftScores.map((g) => `${g.name}: ${g.total}`).join("\n"),
      "DISC Primary Type":            primaryDisc,
      "DISC Score D":                 discScores.D,
      "DISC Score I":                 discScores.I,
      "DISC Score S":                 discScores.S,
      "DISC Score C":                 discScores.C,
      "Passions / Drives":            body.passions ?? [],
      "People Groups to Serve":       body.people ?? [],
      "Causes / Issues":              body.causes ?? [],
      "Serving Opportunities (Top 3)": body.heartServing ?? "",
      "Previous Serving Experience":  body.heartExperience ?? "",
      "Heart – Who to Influence":     body.heartInfluence ?? "",
      "Heart – Dream to Fulfill":     body.heartDream ?? "",
      "Abilities Selected":           (body.abilities ?? []).join(", "),
      "Experience – Educational":     body.expEducation ?? "",
      "Experience – Ministry":        body.expMinistry ?? "",
      "Experience – Painful":         body.expPainful ?? "",
      "Experience – Spiritual":       body.expSpiritual ?? "",
      "Additional Comments":          body.additionalComments ?? "",
    };

    if (body.phone) fields["Phone"] = body.phone;

    // Remove empty values
    Object.keys(fields).forEach((k) => {
      const v = fields[k];
      if (v === "" || (Array.isArray(v) && v.length === 0)) delete fields[k];
    });

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_SHAPE_BASE_ID}/${process.env.AIRTABLE_SHAPE_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ typecast: true, records: [{ fields }] }),
      }
    );

    if (!response.ok) {
      const error: AirtableError = await response.json();
      console.error("Airtable error:", error);
      return NextResponse.json(
        { error: error.error?.message ?? "Failed to submit" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
