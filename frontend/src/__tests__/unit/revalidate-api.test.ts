import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock next/cache revalidatePath
const mockRevalidatePath = vi.fn();
vi.mock("next/cache", () => ({
  revalidatePath: (...args: unknown[]) => mockRevalidatePath(...args),
}));

/**
 * Helper to create a NextRequest-compatible object for the revalidate route.
 * The route uses request.nextUrl.searchParams, so we construct a real URL.
 */
function makeRevalidateRequest(params: Record<string, string>) {
  const url = new URL("http://localhost:3000/api/revalidate");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  // NextRequest exposes nextUrl which is a NextURL wrapping the URL.
  // In the test env we can create a minimal mock that satisfies the route.
  return {
    nextUrl: url,
  } as { nextUrl: URL };
}

describe("GET /api/revalidate", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    process.env.REVALIDATE_SECRET = "my-secret";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns 401 when secret is missing", async () => {
    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ path: "/actualites" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Invalid secret");
  });

  it("returns 401 when secret is wrong", async () => {
    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ secret: "wrong-secret", path: "/actualites" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Invalid secret");
  });

  it("returns 400 when path parameter is missing", async () => {
    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ secret: "my-secret" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Missing path parameter");
  });

  it("revalidates all locales for a bare path", async () => {
    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ secret: "my-secret", path: "/actualites" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.revalidated).toBe(true);
    expect(data.paths).toHaveLength(6); // fr, en, es, it, de, pt-BR

    expect(mockRevalidatePath).toHaveBeenCalledTimes(6);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/fr/actualites");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/en/actualites");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/es/actualites");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/it/actualites");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/de/actualites");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/pt-BR/actualites");
  });

  it("strips existing locale prefix and revalidates all locales", async () => {
    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ secret: "my-secret", path: "/fr/actualites/my-post" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.revalidated).toBe(true);

    // Should strip /fr and revalidate all 6 locales
    expect(mockRevalidatePath).toHaveBeenCalledWith("/fr/actualites/my-post");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/en/actualites/my-post");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/es/actualites/my-post");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/it/actualites/my-post");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/de/actualites/my-post");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/pt-BR/actualites/my-post");
  });

  it("handles regional locale prefix (pt-BR)", async () => {
    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ secret: "my-secret", path: "/pt-BR/actualites" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.revalidated).toBe(true);
    // Should strip /pt-BR and revalidate all locales
    expect(mockRevalidatePath).toHaveBeenCalledTimes(6);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/fr/actualites");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/pt-BR/actualites");
  });

  it("revalidates root path for all locales", async () => {
    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ secret: "my-secret", path: "/" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.paths).toContain("/fr");
    expect(data.paths).toContain("/en");
    expect(data.paths).toContain("/pt-BR");
  });

  it("returns 500 when revalidatePath throws", async () => {
    mockRevalidatePath.mockImplementation(() => {
      throw new Error("Cache purge failed");
    });

    const { GET } = await import("@/app/api/revalidate/route");
    const req = makeRevalidateRequest({ secret: "my-secret", path: "/actualites" });
    const res = await GET(req as never);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Revalidation failed");
    expect(data.details).toContain("Cache purge failed");
  });
});
