// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/**/*.test.ts"],

        // Pretty console output + JSON report
        reporters: [
            "verbose",
            ["json", { outputFile: "tests/results/test-results.json" }]
        ],

        // Coverage configuration
        coverage: {
            provider: "v8",                      // Built-in V8 coverage
            reporter: ["text", "html"],          // Text summary + HTML report
            reportsDirectory: "tests/coverage",  // HTML coverage output
        },

        environment: "node",
    },
});
