import { readdirSync } from "node:fs";
import { extname } from "node:path";

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

  for (const f of readdirSync(p, { withFileTypes: true, recursive })) {
    if (ignore?.some(ig => f.parentPath.includes(ig))) continue;
    const ext = extname(f.name).substring(1);
    if (ext && isNaN(+ext)) langs[ext] = (langs[ext] || 0) + 1;
  }

  return {
    languages: langs,
    totalFiles: Object.values(langs).reduce((a, b) => a + b, 0),
  };
}
