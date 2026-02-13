/**
 * Structured logger — replaces raw console.error calls.
 * Outputs JSON in production for easy parsing, readable format in dev.
 */

type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: unknown;
  timestamp: string;
}

const isProduction = process.env.NODE_ENV === "production";

function log(level: LogLevel, message: string, context?: string, data?: unknown) {
  const entry: LogEntry = {
    level,
    message,
    ...(context && { context }),
    ...(data !== undefined && { data }),
    timestamp: new Date().toISOString(),
  };

  if (isProduction) {
    // JSON structured output for log aggregation
    const method = level === "error" ? console.error : level === "warn" ? console.warn : console.info;
    method(JSON.stringify(entry));
  } else {
    // Readable dev output
    const prefix = `[${level.toUpperCase()}]`;
    const ctx = context ? ` [${context}]` : "";
    if (data !== undefined) {
      console[level](`${prefix}${ctx} ${message}`, data);
    } else {
      console[level](`${prefix}${ctx} ${message}`);
    }
  }
}

export const logger = {
  info: (message: string, context?: string, data?: unknown) => log("info", message, context, data),
  warn: (message: string, context?: string, data?: unknown) => log("warn", message, context, data),
  error: (message: string, context?: string, data?: unknown) => log("error", message, context, data),
};
