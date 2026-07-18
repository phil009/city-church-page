"use client";

import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";
import { DISC_TYPES } from "@/data/shape-data";
import { Button } from "@/components/ui/button";

interface MatchResult {
  unit: { name: string; team: string };
  pct: number;
  reasons: string[];
}

interface Props {
  data: ShapeFormValues;
  topGifts: { name: string; score: number }[];
  primaryDiscType: "D" | "I" | "S" | "C";
  p16Code: string;
  p16Info: { name: string; role: string; desc: string } | undefined;
  matches: MatchResult[];
  showButton?: boolean;
}

export interface ShapeResultPdfHandle {
  generateBase64: () => Promise<string | null>;
}

const ShapeResultPdf = forwardRef<ShapeResultPdfHandle, Props>(function ShapeResultPdf(
  { data, topGifts, primaryDiscType, p16Code, p16Info, matches, showButton = true },
  ref
) {
  const printRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const generate = async (): Promise<string | null> => {
    if (!printRef.current) return null;
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgRatio = canvas.height / canvas.width;
    const imgW = pageW;
    const imgH = imgRatio * imgW;

    let yPos = 0;
    let remaining = imgH;

    while (remaining > 0) {
      const sliceH = Math.min(pageH, remaining);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.round(sliceH * (canvas.width / imgW));
      const ctx = sliceCanvas.getContext("2d")!;
      ctx.drawImage(
        canvas,
        0,
        Math.round(yPos * (canvas.width / imgW)),
        canvas.width,
        sliceCanvas.height,
        0,
        0,
        sliceCanvas.width,
        sliceCanvas.height
      );
      pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 0, 0, imgW, sliceH);
      remaining -= sliceH;
      yPos += sliceH;
      if (remaining > 0) pdf.addPage();
    }

    return pdf.output("datauristring");
  };

  useImperativeHandle(ref, () => ({
    generateBase64: generate,
  }));

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(printRef.current!, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgRatio = canvas.height / canvas.width;
      const imgW = pageW;
      const imgH = imgRatio * imgW;

      let yPos = 0;
      let remaining = imgH;

      while (remaining > 0) {
        const sliceH = Math.min(pageH, remaining);
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = Math.round(sliceH * (canvas.width / imgW));
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(
          canvas,
          0,
          Math.round(yPos * (canvas.width / imgW)),
          canvas.width,
          sliceCanvas.height,
          0,
          0,
          sliceCanvas.width,
          sliceCanvas.height
        );
        pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 0, 0, imgW, sliceH);
        remaining -= sliceH;
        yPos += sliceH;
        if (remaining > 0) pdf.addPage();
      }

      pdf.save(`SHAPE-${data.firstName}-${data.lastName}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      {showButton && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={handleDownload}
            disabled={generating}
            variant="outline"
            className="border-appRed text-appRed hover:bg-red-50 px-6"
          >
            {generating ? "Generating PDF…" : "Download PDF"}
          </Button>
        </div>
      )}

      {/* Hidden printable layout */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none" aria-hidden="true">
        <div
          ref={printRef}
          style={{
            width: "794px",
            padding: "48px",
            fontFamily: "Arial, sans-serif",
            background: "#fff",
            color: "#18191d",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#18191d",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "12px",
              marginBottom: "32px",
            }}
          >
            <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>S.H.A.P.E. Assessment</h1>
            <p style={{ fontSize: "14px", opacity: 0.6, marginTop: "4px" }}>
              {data.firstName} {data.lastName} · {data.email}
            </p>
          </div>

          {/* Gifts */}
          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ec2424", marginBottom: "12px" }}>
              S — Top Spiritual Gifts
            </h2>
            {topGifts.map((g, i) => (
              <div key={g.name} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ec2424", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>{g.name}</span>
                <span style={{ fontSize: "12px", color: "#999", marginLeft: "auto" }}>{g.score}/9</span>
              </div>
            ))}
          </section>

          {/* DISC */}
          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ec2424", marginBottom: "12px" }}>
              P — Personality (DISC)
            </h2>
            <p style={{ fontSize: "14px" }}>
              <strong>{primaryDiscType} — {DISC_TYPES[primaryDiscType].name}</strong>
              <span style={{ color: "#666", marginLeft: "8px", fontSize: "13px" }}>{DISC_TYPES[primaryDiscType].desc}</span>
            </p>
          </section>

          {/* 16P */}
          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ec2424", marginBottom: "12px" }}>
              P — 16 Personalities
            </h2>
            <p style={{ fontSize: "14px" }}>
              <strong>{p16Code}{p16Info ? ` — ${p16Info.name}` : ""}</strong>
              {p16Info && <span style={{ color: "#666", marginLeft: "8px", fontSize: "13px" }}>{p16Info.desc}</span>}
            </p>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "32px 0" }} />

          {/* Ministry matches */}
          <section>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ec2424", marginBottom: "16px" }}>
              Top Ministry Matches
            </h2>
            {matches.map((m, i) => (
              <div key={m.unit.name} style={{ marginBottom: "16px", border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ background: "#f8f9fa", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ec2424", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "14px" }}>{m.unit.name}</p>
                    <p style={{ margin: 0, color: "#888", fontSize: "12px" }}>{m.unit.team}</p>
                  </div>
                  <span style={{ fontWeight: 700, color: "#ec2424", fontSize: "18px" }}>{m.pct}%</span>
                </div>
                <div style={{ padding: "10px 16px" }}>
                  <div style={{ height: "6px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
                    <div style={{ height: "100%", width: `${m.pct}%`, background: "#ec2424", borderRadius: "3px" }} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {m.reasons.map((r) => (
                      <span key={r} style={{ fontSize: "11px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "20px", padding: "2px 8px", color: "#18191d" }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <p style={{ marginTop: "40px", fontSize: "12px", color: "#aaa", textAlign: "center", fontStyle: "italic" }}>
            &ldquo;For we are God&apos;s masterpiece.&rdquo; — Ephesians 2:10 · City Church Calabar
          </p>
        </div>
      </div>
    </>
  );
});

export default ShapeResultPdf;
