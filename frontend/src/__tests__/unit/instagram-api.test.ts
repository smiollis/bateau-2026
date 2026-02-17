import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock logger to avoid console noise in tests
vi.mock("@/lib/logger", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

const samplePosts = [
  {
    id: "123",
    caption: "Beautiful sunset on the Seine",
    media_type: "IMAGE" as const,
    media_url: "https://example.com/photo1.jpg",
    permalink: "https://instagram.com/p/abc123",
    timestamp: "2026-02-01T12:00:00+0000",
  },
  {
    id: "456",
    caption: "Evening cruise",
    media_type: "VIDEO" as const,
    media_url: "https://example.com/video1.mp4",
    permalink: "https://instagram.com/p/def456",
    thumbnail_url: "https://example.com/thumb1.jpg",
    timestamp: "2026-02-02T18:00:00+0000",
  },
];

describe("GET /api/instagram", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    process.env.INSTAGRAM_ACCESS_TOKEN = "test_instagram_token";
    global.fetch = vi.fn();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns posts on successful fetch", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: samplePosts }),
    });

    const { GET } = await import("@/app/api/instagram/route");
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.posts).toHaveLength(2);
    expect(data.posts[0].id).toBe("123");
    expect(data.posts[1].media_type).toBe("VIDEO");
  });

  it("calls Instagram API with correct URL and token", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    const { GET } = await import("@/app/api/instagram/route");
    await GET();

    expect(global.fetch).toHaveBeenCalledOnce();
    const calledUrl = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0]![0] as string;
    expect(calledUrl).toContain("https://graph.instagram.com/me/media");
    expect(calledUrl).toContain("access_token=test_instagram_token");
    expect(calledUrl).toContain("limit=12");
    expect(calledUrl).toContain("fields=");
  });

  it("sets Cache-Control header on success", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: samplePosts }),
    });

    const { GET } = await import("@/app/api/instagram/route");
    const res = await GET();

    expect(res.headers.get("Cache-Control")).toContain("public");
    expect(res.headers.get("Cache-Control")).toContain("s-maxage=3600");
  });

  it("returns 500 when INSTAGRAM_ACCESS_TOKEN is not set", async () => {
    delete process.env.INSTAGRAM_ACCESS_TOKEN;

    const { GET } = await import("@/app/api/instagram/route");
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Instagram token not configured");
  });

  it("returns error status when Instagram API fails", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({ error: { message: "Invalid token" } }),
    });

    const { GET } = await import("@/app/api/instagram/route");
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(403);
    expect(data.error).toBe("Failed to fetch Instagram posts");
  });

  it("returns 500 when fetch throws a network error", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network timeout"),
    );

    const { GET } = await import("@/app/api/instagram/route");
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Internal server error");
  });

  it("handles empty data array gracefully", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    const { GET } = await import("@/app/api/instagram/route");
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.posts).toEqual([]);
  });

  it("handles missing data field gracefully", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { GET } = await import("@/app/api/instagram/route");
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.posts).toEqual([]);
  });
});
