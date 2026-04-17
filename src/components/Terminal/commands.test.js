import { describe, expect, test } from "vitest";
import { runCommand } from "./commands";

describe("terminal command parser", () => {
  test("help returns a list with every other command mentioned", () => {
    const out = runCommand("help");
    expect(out.length).toBeGreaterThan(4);
    const joined = out.join(" ");
    for (const cmd of ["whoami", "skills", "projects", "contact", "clear", "exit"]) {
      expect(joined).toContain(cmd);
    }
  });

  test("unknown command returns a friendly error", () => {
    const out = runCommand("gibberish");
    expect(out.length).toBe(1);
    expect(out[0]).toMatch(/command not found/i);
  });

  test("is case-insensitive", () => {
    expect(runCommand("HELP").length).toBeGreaterThan(1);
    expect(runCommand("Whoami").length).toBeGreaterThan(0);
  });

  test("clear returns control sentinel", () => {
    expect(runCommand("clear")).toBe("__CLEAR__");
  });

  test("exit returns control sentinel", () => {
    expect(runCommand("exit")).toBe("__EXIT__");
  });

  test("sudo refuses politely", () => {
    const out = runCommand("sudo anything");
    expect(out.join(" ")).toMatch(/nice try/i);
  });

  test("rm -rf / refuses with a wink", () => {
    const out = runCommand("rm -rf /");
    expect(out.join(" ")).toMatch(/refusing/i);
  });

  test("empty input returns empty output", () => {
    expect(runCommand("")).toEqual([]);
    expect(runCommand("   ")).toEqual([]);
  });

  test("echo prints its args", () => {
    expect(runCommand("echo hello world")).toEqual(["hello world"]);
  });

  test("projects output contains repo URLs", () => {
    const out = runCommand("projects").join(" ");
    expect(out).toContain("https://github.com/coleyrockin/linkx");
  });
});
