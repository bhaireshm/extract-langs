#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getLanguages, type Options } from ".";
import pkg from "../package.json";

yargs(hideBin(process.argv))
  .scriptName("el")
  .version(pkg.version).alias('v', 'version')
  .help("h").alias("h", "help")
  .parserConfiguration({
    "short-option-groups": true,
    "camel-case-expansion": true,
    "dot-notation": true,
    "parse-numbers": true,
    "boolean-negation": true,
    "strip-dashed": true,
  })
  .wrap(process.stdout.columns > 125 ? 125 : process.stdout.columns)
  .usage("$0 [options] <path>")
  .command(
    "$0 <path>",
    "Get languages from files",
    (yargs) => {
      yargs.positional("path", {
        describe: "Path to directory",
        type: "string",
      });
    },
    (argv) => {
      const options: Options = {
        recursive: argv?.recursive as boolean,
        ignore: (argv?.ignore as string | undefined) ?
          (argv?.ignore as string).split(",") :
          [],
      };
      const result = getLanguages(argv.path as string, options);
      const resultJson = JSON.stringify(result, null, 2);
      const resultFile = join(argv.path as string, argv?.outFile as string || "languages.json");
      writeFileSync(resultFile, resultJson);
      console.log(`Wrote result to ${resultFile}`);
    }
  )
  .option("recursive", {
    alias: "r",
    type: "boolean",
    default: true,
    describe: "Read directories recursively",
  })
  .option("ignore", {
    alias: "i",
    type: "string",
    describe: "Comma-separated list of directories to ignore",
  })
  .option("outFile", {
    alias: "o",
    type: "string",
    describe: "Path to output file",
  })
  .parse();
