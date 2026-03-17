"use client";

import React from "react";

interface Token {
  type: string;
  value: string;
}

const PATTERNS: [string, RegExp][] = [
  ["comment", /^\/\/.*$/m],
  ["comment", /^\/\*[\s\S]*?\*\//m],
  ["string", /^"(?:[^"\\]|\\.)*"/],
  ["string", /^'(?:[^'\\]|\\.)*'/],
  ["string", /^`(?:[^`\\]|\\.)*`/],
  ["keyword", /^(?:import|export|from|const|let|var|function|return|if|else|default|new|typeof|interface|type|extends|implements|class|async|await|for|while|of|in|throw|try|catch|finally|switch|case|break|continue|do|yield|void|delete|instanceof|as)\b/],
  ["jsx-tag", /^<\/?[A-Z][A-Za-z0-9.]*/],
  ["html-tag", /^<\/?[a-z][a-z0-9-]*/],
  ["close-tag", /^\/?>/],
  ["boolean", /^(?:true|false|null|undefined)\b/],
  ["number", /^-?\d+\.?\d*(?:e[+-]?\d+)?/],
  ["type", /^(?:React|HTMLButtonElement|HTMLDivElement|Mesh|Canvas|ReactNode|Metadata|MouseEvent|string|number|boolean)\b/],
  ["decorator", /^@[a-zA-Z_][\w/.-]*/],
  ["function", /^[a-zA-Z_$][\w$]*(?=\s*\()/],
  ["property", /^[a-zA-Z_$][\w$]*(?=\s*[=:])/],
  ["punctuation", /^[{}[\]();:,.<>?!&|=+\-*/^%~@#]/],
  ["plain", /^[a-zA-Z_$][\w$]*/],
  ["space", /^\s+/],
];

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let remaining = code;

  while (remaining.length > 0) {
    let matched = false;
    for (const [type, regex] of PATTERNS) {
      const match = remaining.match(regex);
      if (match) {
        tokens.push({ type, value: match[0] });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: "plain", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }
  return tokens;
}

const COLOR_MAP: Record<string, string> = {
  keyword: "text-purple-400",
  string: "text-emerald-400",
  comment: "text-zinc-600 italic",
  number: "text-amber-400",
  boolean: "text-amber-400",
  type: "text-cyan-400",
  "jsx-tag": "text-blue-400",
  "html-tag": "text-blue-400",
  "close-tag": "text-zinc-500",
  function: "text-yellow-300",
  property: "text-sky-300",
  decorator: "text-pink-400",
  punctuation: "text-zinc-500",
  plain: "text-zinc-300",
  space: "",
};

interface SyntaxHighlightProps {
  code: string;
  showLineNumbers?: boolean;
}

export function SyntaxHighlight({
  code,
  showLineNumbers = true,
}: SyntaxHighlightProps) {
  const lines = code.split("\n");

  return (
    <div className="flex text-[13px] leading-[1.7]">
      {showLineNumbers && (
        <div className="mr-4 flex flex-col items-end select-none border-r border-white/[0.04] pr-4 font-mono">
          {lines.map((_, i) => (
            <span key={i} className="text-zinc-700">
              {i + 1}
            </span>
          ))}
        </div>
      )}
      <pre className="flex-1 overflow-x-auto">
        <code>
          {lines.map((line, lineIdx) => {
            const tokens = tokenize(line);
            return (
              <span key={lineIdx} className="block">
                {tokens.length === 0 ? (
                  "\n"
                ) : (
                  tokens.map((token, tokenIdx) => (
                    <span
                      key={tokenIdx}
                      className={COLOR_MAP[token.type] || "text-zinc-300"}
                    >
                      {token.value}
                    </span>
                  ))
                )}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
