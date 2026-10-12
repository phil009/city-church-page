import {
  GIFT_CATEGORIES,
  MINISTRY_UNITS,
  P16_QUESTIONS,
  type MinistryUnit,
  type P16Dimension,
} from "@/data/shape-data";

export type DiscKey = "D" | "I" | "S" | "C";

export interface MatchResult {
  unit: MinistryUnit;
  score: number;
  pct: number;
  reasons: string[];
}

export function computeGiftScores(
  spiritualGifts: Record<string, number> | undefined,
): Record<string, number> {
  return GIFT_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.name] = (cat.questions as readonly number[]).reduce(
      (sum, q) => sum + (spiritualGifts?.[String(q)] ?? 0),
      0,
    );
    return acc;
  }, {});
}

export function topGiftsFromScores(
  giftScores: Record<string, number>,
  count = 3,
): { name: string; score: number }[] {
  return Object.entries(giftScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([name, score]) => ({ name, score }));
}

export function computeDiscScores(
  disc: Record<string, string> | undefined,
): Record<DiscKey, number> {
  const scores = { D: 0, I: 0, S: 0, C: 0 } as Record<DiscKey, number>;
  Object.values(disc ?? {}).forEach((v) => {
    if (v in scores) scores[v as DiscKey]++;
  });
  return scores;
}

export function primaryDiscFromScores(
  discScores: Record<DiscKey, number>,
): DiscKey {
  return (["D", "I", "S", "C"] as const).reduce((a, b) =>
    discScores[a] >= discScores[b] ? a : b,
  );
}

export function computeP16Code(p16: Record<string, number>): string {
  const dims: P16Dimension[] = ["E", "N", "T", "J"];
  const opposites: Record<string, string> = { E: "I", N: "S", T: "F", J: "P" };
  let code = "";

  dims.forEach((dim) => {
    const qs = P16_QUESTIONS.filter((q) => q.dimension === dim);
    const raw = qs.reduce((sum, q) => {
      const v = p16[String(q.id)];
      if (v === undefined) return sum;
      return sum + q.polarity * v;
    }, 0);
    code += raw >= 0 ? dim : opposites[dim];
  });

  return code;
}

export function computeMinistryMatches(
  topGiftNames: string[],
  primaryDisc: string,
  p16Code: string,
  passions: string[],
  people: string[],
  causes: string[],
  abilities: string[],
): MatchResult[] {
  const base4 = p16Code.slice(0, 4);

  const results: MatchResult[] = MINISTRY_UNITS.map((unit) => {
    let score = 0;
    const reasons: string[] = [];

    // Gifts (40 pts max) — overlap of top 3 gifts with unit's gift list
    const giftOverlap = topGiftNames.filter((g) => unit.gifts.includes(g)).length;
    if (giftOverlap > 0) {
      score += Math.round((giftOverlap / Math.max(unit.gifts.length, 1)) * 40);
      reasons.push(
        `Gift match: ${topGiftNames.filter((g) => unit.gifts.includes(g)).join(", ")}`,
      );
    }

    // DISC (20 pts) — primary type in unit disc list
    if (unit.disc.includes(primaryDisc)) {
      score += 20;
      reasons.push(`DISC: ${primaryDisc}`);
    }

    // 16P (10 pts) — 4-letter base code in unit p16types list
    if (unit.p16types.includes(base4)) {
      score += 10;
      reasons.push(`16P: ${base4}`);
    }

    // Passions (15 pts max)
    if (passions.length > 0 && unit.passions.length > 0) {
      const overlap = passions.filter((p) => unit.passions.includes(p)).length;
      if (overlap > 0) {
        score += Math.round((overlap / unit.passions.length) * 15);
        reasons.push(`Passion match`);
      }
    }

    // People (10 pts max)
    if (people.length > 0 && unit.people.length > 0) {
      const overlap = people.filter((p) => unit.people.includes(p)).length;
      if (overlap > 0) {
        score += Math.round((overlap / unit.people.length) * 10);
        reasons.push(`People group match`);
      }
    }

    // Causes (5 pts max)
    if (causes.length > 0 && unit.causes.length > 0) {
      const overlap = causes.filter((c) => unit.causes.includes(c)).length;
      if (overlap > 0) {
        score += Math.round((overlap / unit.causes.length) * 5);
        reasons.push(`Cause match`);
      }
    }

    // Abilities (15 pts max)
    if (abilities.length > 0 && unit.abilities.length > 0) {
      const overlap = abilities.filter((a) => unit.abilities.includes(a)).length;
      if (overlap > 0) {
        score += Math.round((overlap / unit.abilities.length) * 15);
        reasons.push(`Ability match`);
      }
    }

    return { unit, score, pct: Math.round((score / 115) * 100), reasons };
  });

  // Sort by score, then enforce team diversity (max 2 per team in top 5)
  results.sort((a, b) => b.score - a.score);

  const top5: MatchResult[] = [];
  const teamCount: Record<string, number> = {};

  for (const r of results) {
    if (top5.length >= 5) break;
    const t = r.unit.team;
    if ((teamCount[t] ?? 0) < 2) {
      top5.push(r);
      teamCount[t] = (teamCount[t] ?? 0) + 1;
    }
  }

  return top5;
}
