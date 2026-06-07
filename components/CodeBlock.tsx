import React from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

function tokenKey(lineIndex: number, start: number, end: number, kind: string) {
  return `${lineIndex}:${start}:${end}:${kind}`;
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
  const keywordSet = new Set(keywords);
  const builtinSet = new Set(builtins);

  const lines = code.split("\n");
  const elements: React.ReactElement[] = [];

  lines.forEach((line, lineIndex) => {
    const tokens: React.ReactElement[] = [];
    let i = 0;

    while (i < line.length) {
      // Single-line comments
      if (line[i] === "/" && line[i + 1] === "/") {
        tokens.push(
          <span key={tokenKey(lineIndex, i, line.length, "comment")} className="code-comment">
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
          <span key={tokenKey(lineIndex, i, j, "annotation")} className="code-annotation">
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
          <span key={tokenKey(lineIndex, i, j + 1, "string")} className="code-string">
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
          <span key={tokenKey(lineIndex, i, j + 1, "char")} className="code-string">
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
          <span key={tokenKey(lineIndex, i, j, "number")} className="code-number">
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
          <span key={tokenKey(lineIndex, i, j, "generic")} className="code-generic">
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

        if (keywordSet.has(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "keyword")} className="code-keyword">
              {word}
            </span>
          );
        } else if (builtinSet.has(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "builtin")} className="code-builtin">
              {word}
            </span>
          );
        } else if (j < line.length && line[j] === "(") {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "function")} className="code-function">
              {word}
            </span>
          );
        } else if (/^[A-Z]/.test(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "type")} className="code-type">
              {word}
            </span>
          );
        } else {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "variable")} className="code-variable">
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
          <span key={tokenKey(lineIndex, i, j, "operator")} className="code-operator">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Whitespace and other characters
      tokens.push(<span key={tokenKey(lineIndex, i, i + 1, "text")}>{line[i]}</span>);
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

function highlightC(code: string): React.ReactElement[] {
  const keywords = [
    "auto", "break", "case", "char", "const", "continue", "default", "do",
    "double", "else", "enum", "extern", "float", "for", "goto", "if",
    "inline", "int", "long", "register", "restrict", "return", "short",
    "signed", "sizeof", "static", "struct", "switch", "typedef", "union",
    "unsigned", "void", "volatile", "while", "NULL", "true", "false",
  ];

  const builtins = [
    "printf", "scanf", "fprintf", "fscanf", "sprintf", "sscanf",
    "fgets", "fputs", "puts", "gets", "fopen", "fclose", "fread", "fwrite",
    "malloc", "calloc", "realloc", "free", "sizeof",
    "strlen", "strcpy", "strncpy", "strcat", "strncat", "strcmp", "strncmp",
    "strchr", "strrchr", "strstr", "strspn", "strcspn", "strpbrk", "strtok",
    "atoi", "atof", "atol", "strtod", "strtof", "strtol",
    "sin", "cos", "tan", "exp", "log", "log10", "pow", "sqrt", "ceil", "floor", "fabs",
    "srand", "rand", "time", "clock", "difftime", "mktime", "localtime", "gmtime",
    "ctime", "asctime", "getchar", "putchar", "qsort", "bsearch", "memcpy", "memset",
    "EOF", "stdin", "stdout", "stderr", "FILE", "size_t", "time_t", "clock_t",
  ];

  const preprocessor = ["include", "define", "ifdef", "ifndef", "endif", "pragma", "undef"];
  const keywordSet = new Set(keywords);
  const builtinSet = new Set(builtins);
  const preprocessorSet = new Set(preprocessor);

  const lines = code.split("\n");
  const elements: React.ReactElement[] = [];

  lines.forEach((line, lineIndex) => {
    const tokens: React.ReactElement[] = [];
    let i = 0;

    while (i < line.length) {
      // Preprocessor directives
      if (line[i] === "#") {
        let j = i + 1;
        while (j < line.length && /\s/.test(line[j])) j++;
        let k = j;
        while (k < line.length && /\w/.test(line[k])) k++;
        const directive = line.slice(j, k);
        if (preprocessorSet.has(directive)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, line.length, "preprocessor")} className="code-preprocessor">
              {line.slice(i)}
            </span>
          );
          break;
        }
      }

      // Single-line comments
      if (line[i] === "/" && line[i + 1] === "/") {
        tokens.push(
          <span key={tokenKey(lineIndex, i, line.length, "comment")} className="code-comment">
            {line.slice(i)}
          </span>
        );
        break;
      }

      // Multi-line comment start (simplified - only handles single line)
      if (line[i] === "/" && line[i + 1] === "*") {
        const endIndex = line.indexOf("*/", i + 2);
        if (endIndex !== -1) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, endIndex + 2, "comment")} className="code-comment">
              {line.slice(i, endIndex + 2)}
            </span>
          );
          i = endIndex + 2;
          continue;
        } else {
          tokens.push(
            <span key={tokenKey(lineIndex, i, line.length, "comment")} className="code-comment">
              {line.slice(i)}
            </span>
          );
          break;
        }
      }

      // Strings (double quotes)
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && line[j] !== '"') {
          if (line[j] === "\\") j++;
          j++;
        }
        tokens.push(
          <span key={tokenKey(lineIndex, i, j + 1, "string")} className="code-string">
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
          <span key={tokenKey(lineIndex, i, j + 1, "char")} className="code-string">
            {line.slice(i, j + 1)}
          </span>
        );
        i = j + 1;
        continue;
      }

      // Numbers
      if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
        let j = i;
        while (j < line.length && /[\d.xXaAbBcCdDeEfFlLuU]/.test(line[j])) j++;
        tokens.push(
          <span key={tokenKey(lineIndex, i, j, "number")} className="code-number">
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

        if (keywordSet.has(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "keyword")} className="code-keyword">
              {word}
            </span>
          );
        } else if (builtinSet.has(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "builtin")} className="code-builtin">
              {word}
            </span>
          );
        } else if (j < line.length && line[j] === "(") {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "function")} className="code-function">
              {word}
            </span>
          );
        } else if (/^[A-Z_][A-Z_0-9]*$/.test(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "constant")} className="code-constant">
              {word}
            </span>
          );
        } else {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "variable")} className="code-variable">
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
          <span key={tokenKey(lineIndex, i, j, "operator")} className="code-operator">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Whitespace and other characters
      tokens.push(<span key={tokenKey(lineIndex, i, i + 1, "text")}>{line[i]}</span>);
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
  const keywordSet = new Set(keywords);
  const builtinSet = new Set(builtins);

  const lines = code.split("\n");
  const elements: React.ReactElement[] = [];

  lines.forEach((line, lineIndex) => {
    const tokens: React.ReactElement[] = [];
    let i = 0;

    while (i < line.length) {
      // Comments
      if (line[i] === "#") {
        tokens.push(
          <span key={tokenKey(lineIndex, i, line.length, "comment")} className="code-comment">
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
          <span key={tokenKey(lineIndex, i, j + 1, "string")} className="code-string">
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
          <span key={tokenKey(lineIndex, i, j, "number")} className="code-number">
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

        if (keywordSet.has(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "keyword")} className="code-keyword">
              {word}
            </span>
          );
        } else if (builtinSet.has(word)) {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "builtin")} className="code-builtin">
              {word}
            </span>
          );
        } else if (j < line.length && line[j] === "(") {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "function")} className="code-function">
              {word}
            </span>
          );
        } else {
          tokens.push(
            <span key={tokenKey(lineIndex, i, j, "variable")} className="code-variable">
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
          <span key={tokenKey(lineIndex, i, j, "operator")} className="code-operator">
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Whitespace and other characters
      tokens.push(<span key={tokenKey(lineIndex, i, i + 1, "text")}>{line[i]}</span>);
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
        : language === "c"
          ? highlightC(children)
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
