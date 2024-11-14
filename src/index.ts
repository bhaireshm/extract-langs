import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

export type Options = {
  recursive?: boolean;
  ignore?: string[];
};

/**
 * Gets a map of languages to counts of files of each language, and total number of files.
 * @param p The path to the directory to search.
 * @param options An object of options.
 * @returns An object with a languages property which is a map of languages to counts of files of each language,
 * and a totalFiles property which is the total number of files.
 */
export function getLanguages(p: string, options?: Options) {
  const langs: Record<string, number> = Object.create({});
  if (!p) return langs;
  const { recursive = true, ignore = [] } = { ...options };

  const gitignorePath = join(p, ".gitignore");
  let gitIgnorePatterns: string[] = [];
  try {
    gitIgnorePatterns = readFileSync(gitignorePath, "utf-8")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
  } catch (err) {
    // If .gitignore doesn't exist, continue without it
  }

  const shouldIgnore = (filePath: string) =>
    ignore.some(ig => filePath.includes(ig)) ||
    gitIgnorePatterns.some(pattern => filePath.includes(pattern));

  for (const f of readdirSync(p, { withFileTypes: true, recursive })) {
    if (shouldIgnore(f.parentPath)) continue;
    const ext = extname(f.name).substring(1);
    if (ext && isNaN(+ext)) langs[ext] = (langs[ext] || 0) + 1;
  }

  return {
    languages: langs,
    totalFiles: Object.values(langs).reduce((a, b) => a + b, 0),
  };
}
