import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { usePreferences } from "../app/PreferencesContext";

export function CodeBlock({ code, label = "Example" }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const resetTimer = useRef(null);
  const { text } = usePreferences();

  // Clear feedback timers when route changes unmount a code example.
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyCode = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus("idle"), 1600);
  };

  const feedback = copyStatus === "copied"
    ? text.common.copied
    : copyStatus === "failed"
      ? text.common.copyFailed
      : text.common.copy;

  return (
    <figure className="code-card">
      <figcaption className="code-card__header">
        <span>{label}</span>
        <button className="icon-text-button" type="button" onClick={copyCode}>
          <Icon name={copyStatus === "copied" ? "check" : "copy"} size={16} />
          {feedback}
        </button>
      </figcaption>
      <pre><code>{code}</code></pre>
      <span className="sr-only" aria-live="polite">{copyStatus === "idle" ? "" : feedback}</span>
    </figure>
  );
}
