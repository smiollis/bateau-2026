import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Resend before importing the route
const mockSend = vi.fn().mockResolvedValue({ id: "test-id" });
vi.mock("resend", () => {
  return {
    Resend: class MockResend {
      emails = { send: mockSend };
    },
  };
});

// Helper to create a Request object
function makeRequest(
  body: Record<string, unknown>,
  headers?: Record<string, string>,
) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `${Math.random()}`, // unique IP per request by default
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Jean Dupont",
  email: "jean@example.com",
  phone: "0612345678",
  message: "Bonjour, je souhaite réserver.",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_EMAIL_TO = "test@example.com";
  });

  it("returns success for valid submission", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeRequest(validBody));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(mockSend).toHaveBeenCalledOnce();
  });

  it("returns 400 for missing name", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeRequest({ ...validBody, name: "" }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBe("validation");
  });

  it("returns 400 for invalid email", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeRequest({ ...validBody, email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("returns validation error when honeypot is filled (bot fills it with a long value)", async () => {
    // The zod schema defines website as z.string().max(0), so any non-empty value
    // will fail validation — which also blocks bots effectively.
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeRequest({ ...validBody, website: "spam-url.com" }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBe("validation");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 429 after exceeding rate limit", async () => {
    // Use a fixed IP for rate limit testing
    const fixedHeaders = { "x-forwarded-for": "192.168.1.100" };
    const { POST } = await import("@/app/api/contact/route");

    // Send 3 requests (within limit)
    for (let i = 0; i < 3; i++) {
      await POST(makeRequest(validBody, fixedHeaders));
    }

    // 4th should be rate limited
    const res = await POST(makeRequest(validBody, fixedHeaders));
    const data = await res.json();
    expect(res.status).toBe(429);
    expect(data.error).toBe("rate_limited");
  });

  it("returns 500 when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });

  it("returns 500 when Resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Resend API error"));
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeRequest(validBody));
    const data = await res.json();
    expect(res.status).toBe(500);
    expect(data.error).toBe("send_failed");
  });
});
