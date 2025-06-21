"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Download,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/components/ui/simple-toast";

export default function NoteTaker() {
  const [notes, setNotes] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load saved notes on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sermon-notes");
      if (saved) setNotes(saved);
    } catch {
      // ignore
    }
  }, []);

  const formatText = (command: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = notes.substring(start, end);

    let prefix = "";
    let suffix = "";
    let newText = selected;

    switch (command) {
      case "bold":
        prefix = "**";
        suffix = "**";
        setIsBold((b) => !b);
        break;
      case "italic":
        prefix = "*";
        suffix = "*";
        setIsItalic((i) => !i);
        break;
      case "underline":
        prefix = "__";
        suffix = "__";
        setIsUnderline((u) => !u);
        break;
      case "bulletList":
        newText = selected
          .split("\n")
          .map((line) => (line.trim() ? `• ${line}` : line))
          .join("\n");
        break;
      case "numberedList":
        newText = selected
          .split("\n")
          .map((line, idx) => (line.trim() ? `${idx + 1}. ${line}` : line))
          .join("\n");
        break;
    }

    const before = notes.substring(0, start);
    const after = notes.substring(end);
    const combined =
      command === "bulletList" || command === "numberedList"
        ? before + newText + after
        : before + prefix + newText + suffix + after;

    setNotes(combined);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + newText.length
      );
    }, 0);
  };

  const downloadNotes = () => {
    if (!notes.trim()) {
      showToast({ title: "No notes to download", type: "info" });
      return;
    }
    try {
      const blob = new Blob([notes], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sermon-notes-${new Date().toISOString().split("T")[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast({ title: "Notes downloaded", type: "success" });
    } catch {
      showToast({ title: "Download failed", type: "error" });
    }
  };

  const saveNotes = () => {
    try {
      localStorage.setItem("sermon-notes", notes);
      localStorage.setItem("sermon-notes-date", new Date().toISOString());
      showToast({ title: "Notes saved", type: "success" });
    } catch {
      showToast({ title: "Error saving notes", type: "error" });
    }
  };

  // const loadSavedNotes = () => {
  //   try {
  //     const saved = localStorage.getItem("sermon-notes");
  //     if (saved) {
  //       setNotes(saved);
  //       showToast({ title: "Notes loaded", type: "success" });
  //     } else {
  //       showToast({ title: "No saved notes", type: "info" });
  //     }
  //   } catch {
  //     showToast({ title: "Error loading notes", type: "error" });
  //   }
  // };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Sermon Notes</h3>
          <div className="flex items-center gap-2">
            <Button onClick={saveNotes} variant="ghost" size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button onClick={downloadNotes} variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {["bold", "italic", "underline", "bulletList", "numberedList"].map(
            (cmd) => {
              const iconMap = {
                bold: <Bold className="h-4 w-4" />,
                italic: <Italic className="h-4 w-4" />,
                underline: <Underline className="h-4 w-4" />,
                bulletList: <List className="h-4 w-4" />,
                numberedList: <ListOrdered className="h-4 w-4" />,
              };
              const isActive =
                cmd === "bold"
                  ? isBold
                  : cmd === "italic"
                  ? isItalic
                  : cmd === "underline"
                  ? isUnderline
                  : false;
              return (
                <Button
                  key={cmd}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => formatText(cmd)}
                >
                  {iconMap[cmd as keyof typeof iconMap]}
                </Button>
              );
            }
          )}
        </div>
      </div>

      {/* Notes Input */}
      <div className="flex-1 p-4">
        <Textarea
          ref={textareaRef}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Take notes during the service..."
          className="w-full h-full resize-none border-0 focus:ring-0 text-base leading-relaxed"
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 flex items-center justify-between text-sm text-gray-600">
        <span>{notes.length} characters</span>
        {/* <Button onClick={loadSavedNotes} variant="ghost" size="sm">
          Load Saved Notes
        </Button> */}
      </div>
    </div>
  );
}
