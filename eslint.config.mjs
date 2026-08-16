import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Next.js 16 removed the `next lint` command in favor of running ESLint
// directly (see PDD §4 / Next.js 16 upgrade guide). This flat config wires
// up the official Next.js rule sets so `npm run lint` behaves the same way
// `next lint` used to.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
