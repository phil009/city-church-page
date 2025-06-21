"use client";

import { useState, useRef } from "react";
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

  const formatText = (command: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);

    let formattedText = selectedText;
    let prefix = "";
    let suffix = "";

    switch (command) {
      case "bold":
        prefix = "**";
        suffix = "**";
        setIsBold(!isBold);
        break;
      case "italic":
        prefix = "*";
        suffix = "*";
        setIsItalic(!isItalic);
        break;
      case "underline":
        prefix = "__";
        suffix = "__";
        setIsUnderline(!isUnderline);
        break;
      case "bulletList":
        formattedText = selectedText
          .split("\n")
          .map((line) => (line.trim() ? `• ${line}` : line))
          .join("\n");
        break;
      case "numberedList":
        formattedText = selectedText
          .split("\n")
          .map((line, index) => (line.trim() ? `${index + 1}. ${line}` : line))
          .join("\n");
        break;
    }

    if (command === "bulletList" || command === "numberedList") {
      const newNotes =
        notes.substring(0, start) + formattedText + notes.substring(end);
      setNotes(newNotes);
    } else {
      const newNotes =
        notes.substring(0, start) +
        prefix +
        formattedText +
        suffix +
        notes.substring(end);
      setNotes(newNotes);
    }

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const downloadNotes = () => {
    if (!notes.trim()) {
      showToast({
        title: "No notes to download",
        description: "Please write some notes first.",
        type: "info",
      });
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

      showToast({
        title: "Notes downloaded",
        description: "Your sermon notes have been saved to your device.",
        type: "success",
      });
    } catch (error) {
      console.error("Error downloading notes:", error);
      showToast({
        title: "Download failed",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  const saveNotes = () => {
    try {
      localStorage.setItem("sermon-notes", notes);
      localStorage.setItem("sermon-notes-date", new Date().toISOString());

      showToast({
        title: "Notes saved",
        description: "Your notes have been saved locally.",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving notes:", error);
      showToast({
        title: "Error saving notes",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  const loadSavedNotes = () => {
    try {
      const savedNotes = localStorage.getItem("sermon-notes");
      if (savedNotes) {
        setNotes(savedNotes);
        showToast({
          title: "Notes loaded",
          description: "Your previously saved notes have been loaded.",
          type: "success",
        });
      } else {
        showToast({
          title: "No saved notes",
          description: "No previously saved notes found.",
          type: "info",
        });
      }
    } catch (error) {
      console.error("Error loading notes:", error);
      showToast({
        title: "Error loading notes",
        description: "Please try again.",
        type: "error",
      });
    }
  };

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

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1">
          <Button
            variant={isBold ? "default" : "ghost"}
            size="sm"
            onClick={() => formatText("bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={isItalic ? "default" : "ghost"}
            size="sm"
            onClick={() => formatText("italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={isUnderline ? "default" : "ghost"}
            size="sm"
            onClick={() => formatText("underline")}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText("bulletList")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText("numberedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notes Area */}
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
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{notes.length} characters</span>
          <Button onClick={loadSavedNotes} variant="ghost" size="sm">
            Load Saved Notes
          </Button>
        </div>
      </div>
    </div>
  );
}
