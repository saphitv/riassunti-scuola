import React from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

function highlightJava(code: string): React.ReactElement[] {
  const keywords = [
    "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char",
    "class", "const", "continue", "default", "do", "double", "else", "enum",
    "extends", "final", "finally", "float", "for", "goto", "if", "implements",
    "import", "instanceof", "int", "interface", "long", "native", "new", "package",
    "private", "protected", "public", "return", "short", "static", "strictfp",
    "super", "switch", "synchronized", "this", "throw", "throws", "transient",
    "try", "void", "volatile", "while", "true", "false", "null", "var", "record",
    "sealed", "permits", "non-sealed", "yield",
  ];

  const builtins = [
    "String", "Integer", "Double", "Float", "Boolean", "Long", "Short", "Byte",
    "Character", "Object", "Class", "System", "List", "ArrayList", "Map", "HashMap",
    "Set", "HashSet", "Collection", "Optional", "Stream", "Number", "Override",
    "Deprecated", "SuppressWarnings", "FunctionalInterface", "Retention", "Target",
  ];

  const lines = code.split("\n");
  const elements: React.ReactElement[] = [];

  lines.forEach((line, lineIndex) => {
    const tokens: React.ReactElement[] = [];
    let i = 0;
    let tokenKey = 0;

    while (i < line.length) {
      // Single-line comments
      if (line[i] === "/" && line[i + 1] === "/") {
        tokens.push(
          <span key={tokenKey++} className="code-comment">
            {line.slice(i)}
          </span>
        );
        break;
      }

      // Annotations
      if (line[i] === "@") {
        let j = i + 1;
        while (j < line.length && /\w/.test(line[j])) j++;
        tokens.push(
          <span key={tokenKey++} className="code-annotation">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Strings (double quotes)
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && line[j] !== '"') {
          if (line[j] === "\\") j++;
          j++;
        }
        tokens.push(
          <span key={tokenKey++} className="code-string">
            {line.slice(i, j + 1)}
          </span>
        );
        i = j + 1;
        continue;
      }

      // Characters (single quotes)
      if (line[i] === "'") {
        let j = i + 1;
        while (j < line.length && line[j] !== "'") {
          if (line[j] === "\\") j++;
          j++;
        }
        tokens.push(
          <span key={tokenKey++} className="code-string">
            {line.slice(i, j + 1)}
          </span>
        );
        i = j + 1;
        continue;
      }

      // Numbers
      if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
        let j = i;
        while (j < line.length && /[\d.fFdDlL]/.test(line[j])) j++;
        tokens.push(
          <span key={tokenKey++} className="code-number">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Generics angle brackets with type
      if (line[i] === "<" && /[A-Z?]/.test(line[i + 1] || "")) {
        let j = i;
        let depth = 0;
        while (j < line.length) {
          if (line[j] === "<") depth++;
          else if (line[j] === ">") {
            depth--;
            if (depth === 0) {
              j++;
              break;
            }
          }
          j++;
        }
        tokens.push(
          <span key={tokenKey++} className="code-generic">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Words (keywords, builtins, identifiers)
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i;
        while (j < line.length && /\w/.test(line[j])) j++;
        const word = line.slice(i, j);

        if (keywords.includes(word)) {
          tokens.push(
            <span key={tokenKey++} className="code-keyword">
              {word}
            </span>
          );
        } else if (builtins.includes(word)) {
          tokens.push(
            <span key={tokenKey++} className="code-builtin">
              {word}
            </span>
          );
        } else if (j < line.length && line[j] === "(") {
          tokens.push(
            <span key={tokenKey++} className="code-function">
              {word}
            </span>
          );
        } else if (/^[A-Z]/.test(word)) {
          tokens.push(
            <span key={tokenKey++} className="code-type">
              {word}
            </span>
          );
        } else {
          tokens.push(
            <span key={tokenKey++} className="code-variable">
              {word}
            </span>
          );
        }
        i = j;
        continue;
      }

      // Operators and punctuation
      if (/[+\-*/%=<>!&|^~:,()[\]{}.]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[+\-*/%=<>!&|^~]/.test(line[j])) j++;
        if (j === i) j++;
        tokens.push(
          <span key={tokenKey++} className="code-operator">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Whitespace and other characters
      tokens.push(<span key={tokenKey++}>{line[i]}</span>);
      i++;
    }

    elements.push(
      <div key={lineIndex} className="code-line">
        {tokens.length > 0 ? tokens : " "}
      </div>
    );
  });

  return elements;
}

function highlightPython(code: string): React.ReactElement[] {
  const keywords = [
    "def",
    "return",
    "if",
    "else",
    "elif",
    "while",
    "for",
    "in",
    "and",
    "or",
    "not",
    "True",
    "False",
    "None",
    "import",
    "from",
    "as",
    "class",
    "try",
    "except",
    "finally",
    "with",
    "lambda",
    "pass",
    "break",
    "continue",
  ];

  const builtins = ["abs", "print", "len", "range", "int", "float", "str", "list"];

  const lines = code.split("\n");
  const elements: React.ReactElement[] = [];

  lines.forEach((line, lineIndex) => {
    const tokens: React.ReactElement[] = [];
    let i = 0;
    let tokenKey = 0;

    while (i < line.length) {
      // Comments
      if (line[i] === "#") {
        tokens.push(
          <span key={tokenKey++} className="code-comment">
            {line.slice(i)}
          </span>
        );
        break;
      }

      // Strings (single or double quotes)
      if (line[i] === '"' || line[i] === "'") {
        const quote = line[i];
        let j = i + 1;
        while (j < line.length && line[j] !== quote) {
          if (line[j] === "\\") j++;
          j++;
        }
        tokens.push(
          <span key={tokenKey++} className="code-string">
            {line.slice(i, j + 1)}
          </span>
        );
        i = j + 1;
        continue;
      }

      // Numbers
      if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
        let j = i;
        while (j < line.length && /[\d.e\-]/.test(line[j])) j++;
        tokens.push(
          <span key={tokenKey++} className="code-number">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Words (keywords, builtins, identifiers)
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i;
        while (j < line.length && /\w/.test(line[j])) j++;
        const word = line.slice(i, j);

        if (keywords.includes(word)) {
          tokens.push(
            <span key={tokenKey++} className="code-keyword">
              {word}
            </span>
          );
        } else if (builtins.includes(word)) {
          tokens.push(
            <span key={tokenKey++} className="code-builtin">
              {word}
            </span>
          );
        } else if (j < line.length && line[j] === "(") {
          tokens.push(
            <span key={tokenKey++} className="code-function">
              {word}
            </span>
          );
        } else {
          tokens.push(
            <span key={tokenKey++} className="code-variable">
              {word}
            </span>
          );
        }
        i = j;
        continue;
      }

      // Operators and punctuation
      if (/[+\-*/%=<>!&|^~:,()[\]{}.]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[+\-*/%=<>!&|^~]/.test(line[j])) j++;
        if (j === i) j++;
        tokens.push(
          <span key={tokenKey++} className="code-operator">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Whitespace and other characters
      tokens.push(<span key={tokenKey++}>{line[i]}</span>);
      i++;
    }

    elements.push(
      <div key={lineIndex} className="code-line">
        {tokens.length > 0 ? tokens : " "}
      </div>
    );
  });

  return elements;
}

export function CodeBlock({
  children,
  language = "python",
  title,
}: CodeBlockProps) {
  const highlighted =
    language === "python"
      ? highlightPython(children)
      : language === "java"
        ? highlightJava(children)
        : null;

  return (
    <div className="code-block">
      {(title || language) && (
        <div className="code-block-header">
          {title && <span className="code-block-title">{title}</span>}
          {language && <span className="code-block-language">{language}</span>}
        </div>
      )}
      <pre className="code-block-content">
        <code>{highlighted || children}</code>
      </pre>
    </div>
  );
}
