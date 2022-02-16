import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  projects: [
    {
      rootDir: "src",
      testMatch: ["<rootDir>/__test__/*.tsx"],
      displayName: { name: "Menmos-Web", color: "red" },
      transform: {
        "^.+\\.tsx?$": require.resolve("ts-jest"),
      },
      testEnvironment: "jsdom",
    },
  ],
};

export default config;
