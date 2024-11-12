# Extract Languages(file extensions)

A Package and CLI tool to extract languages from files.

## Installation

To install the package, run the following command:

```bash
npm install @bhaireshm/extract-languages
```

## Usage

### CLI

The package provides a CLI tool to extract languages from files. To use the CLI, run the following command:

```bash
el|extract-languages <path> [options]
```

Replace `<path>` with the path to the directory you want to extract languages from.

#### Options

- `-r` or `--recursive`: Read directories recursively (default: true)
- `-i` or `--ignore`: Comma-separated list of directories to ignore
- `-o` or `--outFile`: Path to output file (default: languages.json)

Example:

```bash
el /path/to/directory -i node_modules,build -o result.json
```

This command will extract languages from files in the `/path/to/directory` directory, ignoring the `node_modules` and `build` directories, and output the result to a file named `result.json`.

### API

The package also exports a `getLanguages` function that can be used in your own code. The function takes two arguments:

- `p`: The path to the directory to search.
- `options`: An object with the following properties:
  - `recursive`: A boolean indicating whether to read directories recursively (default: true).
  - `ignore`: An array of directories to ignore.

The function returns an object with two properties:

- `languages`: A map of languages to counts of files of each language.
- `totalFiles`: The total number of files.

Example:

```typescript
import { getLanguages } from "@bhaireshm/extract-languages";

const result = getLanguages("/path/to/directory", {
  recursive: true,
  ignore: ["node_modules", "build"],
});

console.log(result);
// Output:
// {
//   languages: {
//     js: 10,
//     ts: 5,
//     html: 2,
//   },
//   totalFiles: 17,
// }
```

Note: The `getLanguages` function is exported from the `src/index.ts` file, so you can import it directly from there if you prefer.
