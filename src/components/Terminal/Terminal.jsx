import { useEffect, useRef, useState } from "react";
import { BANNER, runCommand } from "./commands";

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState(() => BANNER.map((t) => ({ kind: "out", text: t })));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = () => {
    const trimmed = input.trim();
    const result = runCommand(trimmed);

    if (result === "__EXIT__") {
      onClose();
      return;
    }
    if (result === "__CLEAR__") {
      setLines([]);
      setInput("");
      return;
    }

    const out = Array.isArray(result) ? result : [];
    const entry = [{ kind: "cmd", text: trimmed }, ...out.map((t) => ({ kind: "out", text: t }))];
    setLines((prev) => [...prev, ...entry]);
    if (trimmed) setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (next >= 0 && history[next] !== undefined) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div
      className="lx-terminal"
      role="dialog"
      aria-modal="true"
      aria-label="Developer terminal"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="lx-terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="lx-terminal-chrome">
          <span className="lx-terminal-dot" data-color="r" />
          <span className="lx-terminal-dot" data-color="y" />
          <span className="lx-terminal-dot" data-color="g" />
          <span className="lx-terminal-title">boyd@linkx — zsh</span>
          <button
            type="button"
            className="lx-terminal-close"
            onClick={onClose}
            aria-label="Close terminal"
          >
            ×
          </button>
        </div>

        <div className="lx-terminal-screen" ref={scrollRef}>
          {lines.map((line, i) => (
            <div key={i} className={`lx-terminal-line lx-terminal-${line.kind}`}>
              {line.kind === "cmd" ? (
                <>
                  <span className="lx-terminal-prompt">boyd@linkx:~$</span>{" "}
                  <span>{line.text}</span>
                </>
              ) : (
                <span>{line.text || "\u00A0"}</span>
              )}
            </div>
          ))}
          <div className="lx-terminal-line lx-terminal-input">
            <span className="lx-terminal-prompt">boyd@linkx:~$</span>{" "}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal input"
            />
            <span className="lx-terminal-caret" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
