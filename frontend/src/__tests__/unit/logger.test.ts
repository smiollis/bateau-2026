import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger } from "@/lib/logger";

describe("logger", () => {
  let consoleSpy: {
    info: ReturnType<typeof vi.spyOn>;
    warn: ReturnType<typeof vi.spyOn>;
    error: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    consoleSpy = {
      info: vi.spyOn(console, "info").mockImplementation(() => {}),
      warn: vi.spyOn(console, "warn").mockImplementation(() => {}),
      error: vi.spyOn(console, "error").mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    consoleSpy.info.mockRestore();
    consoleSpy.warn.mockRestore();
    consoleSpy.error.mockRestore();
  });

  it("logger.info does not throw", () => {
    expect(() => logger.info("test message")).not.toThrow();
  });

  it("logger.warn does not throw", () => {
    expect(() => logger.warn("warning message")).not.toThrow();
  });

  it("logger.error does not throw", () => {
    expect(() => logger.error("error message")).not.toThrow();
  });

  it("logger.info calls console.info", () => {
    logger.info("test info");
    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it("logger.warn calls console.warn", () => {
    logger.warn("test warn");
    expect(consoleSpy.warn).toHaveBeenCalled();
  });

  it("logger.error calls console.error", () => {
    logger.error("test error");
    expect(consoleSpy.error).toHaveBeenCalled();
  });

  it("logger.info accepts context and data", () => {
    expect(() => logger.info("message", "context", { key: "value" })).not.toThrow();
    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it("logger.warn accepts context and data", () => {
    expect(() => logger.warn("message", "context", { key: "value" })).not.toThrow();
    expect(consoleSpy.warn).toHaveBeenCalled();
  });

  it("logger.error accepts context and data", () => {
    expect(() => logger.error("message", "context", new Error("test"))).not.toThrow();
    expect(consoleSpy.error).toHaveBeenCalled();
  });

  it("dev mode includes [LEVEL] prefix in output", () => {
    logger.info("dev message");
    const callArg = consoleSpy.info.mock.calls[0][0] as string;
    expect(callArg).toContain("[INFO]");
  });

  it("dev mode includes context in output", () => {
    logger.warn("context message", "my-context");
    const callArg = consoleSpy.warn.mock.calls[0][0] as string;
    expect(callArg).toContain("[my-context]");
  });

  it("dev mode includes message in output", () => {
    logger.error("the error text", "ctx");
    const callArg = consoleSpy.error.mock.calls[0][0] as string;
    expect(callArg).toContain("the error text");
  });

  it("logger.info passes data as second argument in dev mode", () => {
    const data = { foo: "bar" };
    logger.info("with data", "ctx", data);
    expect(consoleSpy.info).toHaveBeenCalledWith(
      expect.stringContaining("[INFO]"),
      data
    );
  });
});
