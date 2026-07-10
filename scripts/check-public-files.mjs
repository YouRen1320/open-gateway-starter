import { readFile, readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";
import process from "node:process";

const root = resolve(import.meta.dirname, "..");
const ignoredDirectories = new Set([".git", "dist", "node_modules", "coverage", ".vite"]);
const rules = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/g],
  ["full-format API token", /\b(?:fa-sk|sk)-[A-Za-z0-9_-]{20,}\b/g],
  ["personal email", /\b[A-Z0-9._%+-]+@(?!example\.(?:com|org|net)\b)(?![A-Z0-9.-]*users\.noreply\.github\.com\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/gi],
  ["macOS absolute user path", /\/Users\/[A-Za-z0-9._-]+\//g],
  ["Linux absolute home path", /\/home\/[A-Za-z0-9._-]+\//g],
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return [listFiles(path)];
    return entry.isFile() ? [[path]] : [];
  }));
  return nested.flat();
}

const findings = [];
for (const file of await listFiles(root)) {
  let content;
  try {
    content = await readFile(file, "utf8");
  } catch {
    continue;
  }

  for (const [label, pattern] of rules) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      const line = content.slice(0, match.index).split("\n").length;
      findings.push(`${relative(root, file)}:${line} — ${label}`);
    }
  }
}

if (findings.length) {
  process.stderr.write(`Public-file safety check failed:\n${findings.map((finding) => `- ${finding}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("Public-file safety check found no high-confidence secrets, personal emails, or user-home paths.\n");
}
