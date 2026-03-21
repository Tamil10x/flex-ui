"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Command {
  input: string;
  output?: string;
  delay?: number;
}

interface TypewriterTerminalProps {
  commands: Command[];
  className?: string;
  theme?: "dark" | "matrix";
  typingSpeed?: number;
  loop?: boolean;
  title?: string;
}

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

export function TypewriterTerminal({
  commands,
  className,
  theme = "dark",
  typingSpeed = 50,
  loop = false,
  title = "terminal",
}: TypewriterTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);

  const themeStyles = {
    dark: {
      text: "text-zinc-300",
      prompt: "text-green-400",
      output: "text-zinc-400",
    },
    matrix: {
      text: "text-green-400",
      prompt: "text-green-300",
      output: "text-green-500/80",
    },
  };

  const colors = themeStyles[theme];

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, ms);
        const check = setInterval(() => {
          if (abortRef.current) {
            clearTimeout(timer);
            clearInterval(check);
            resolve();
          }
        }, 50);
      }),
    []
  );

  const runSequence = useCallback(async () => {
    abortRef.current = false;
    setLines([]);
    setCurrentInput("");
    setIsTyping(true);

    for (const command of commands) {
      if (abortRef.current) break;

      // Wait before starting this command
      if (command.delay) {
        await sleep(command.delay);
      }

      // Type input character by character
      for (let i = 0; i <= command.input.length; i++) {
        if (abortRef.current) break;
        setCurrentInput(command.input.slice(0, i));
        await sleep(typingSpeed);
      }

      if (abortRef.current) break;

      // Commit the input line
      setLines((prev) => [...prev, { type: "input", text: command.input }]);
      setCurrentInput("");

      // Show output if present
      if (command.output) {
        await sleep(150);
        if (abortRef.current) break;
        const outputLines = command.output.split("\n");
        for (const line of outputLines) {
          if (abortRef.current) break;
          setLines((prev) => [...prev, { type: "output", text: line }]);
          await sleep(30);
        }
      }

      // Small pause between commands
      await sleep(300);
    }

    setIsTyping(false);

    if (loop && !abortRef.current) {
      await sleep(2000);
      if (!abortRef.current) {
        runSequence();
      }
    }
  }, [commands, typingSpeed, loop, sleep]);

  useEffect(() => {
    runSequence();
    return () => {
      abortRef.current = true;
    };
  }, [runSequence]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs font-medium text-zinc-500">{title}</span>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "max-h-[400px] min-h-[200px] overflow-y-auto p-4 font-mono text-sm leading-relaxed",
          theme === "matrix" ? "bg-black" : "bg-zinc-950"
        )}
      >
        {/* Completed lines */}
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.type === "input" ? (
              <span>
                <span className={colors.prompt}>$ </span>
                <span className={colors.text}>{line.text}</span>
              </span>
            ) : (
              <span className={colors.output}>{line.text}</span>
            )}
          </div>
        ))}

        {/* Current typing line */}
        {(isTyping || currentInput) && (
          <div className="whitespace-pre-wrap">
            <span className={colors.prompt}>$ </span>
            <span className={colors.text}>{currentInput}</span>
            <span
              className={cn(
                "inline-block h-[1.1em] w-[0.5em] translate-y-[0.15em] align-text-bottom",
                showCursor ? (theme === "matrix" ? "bg-green-400" : "bg-zinc-300") : "bg-transparent"
              )}
            />
          </div>
        )}

        {/* Idle cursor after sequence ends */}
        {!isTyping && !currentInput && lines.length > 0 && !loop && (
          <div className="whitespace-pre-wrap">
            <span className={colors.prompt}>$ </span>
            <span
              className={cn(
                "inline-block h-[1.1em] w-[0.5em] translate-y-[0.15em] align-text-bottom",
                showCursor ? (theme === "matrix" ? "bg-green-400" : "bg-zinc-300") : "bg-transparent"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
