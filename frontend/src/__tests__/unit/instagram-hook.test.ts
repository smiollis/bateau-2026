import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

// Mock the static instagram data import - factory must be self-contained (hoisted)
vi.mock("@/data/instagram.json", () => ({
  default: [
    {
      id: "1",
      caption: "Photo 1",
      media_type: "IMAGE",
      media_url: "/images/instagram/1.webp",
      permalink: "https://instagram.com/p/1",
      timestamp: "2025-09-05T17:00:14+0000",
    },
    {
      id: "2",
      caption: "Photo 2",
      media_type: "CAROUSEL_ALBUM",
      media_url: "/images/instagram/2.webp",
      permalink: "https://instagram.com/p/2",
      timestamp: "2025-08-07T20:01:26+0000",
    },
    {
      id: "3",
      caption: "Video post",
      media_type: "VIDEO",
      media_url: "/images/instagram/3.mp4",
      permalink: "https://instagram.com/p/3",
      thumbnail_url: "/images/instagram/3-thumb.jpg",
      timestamp: "2025-07-27T19:21:19+0000",
    },
    {
      id: "4",
      caption: "Photo 4",
      media_type: "IMAGE",
      media_url: "/images/instagram/4.webp",
      permalink: "https://instagram.com/p/4",
      timestamp: "2025-07-20T10:00:00+0000",
    },
    {
      id: "5",
      caption: "Photo 5",
      media_type: "IMAGE",
      media_url: "/images/instagram/5.webp",
      permalink: "https://instagram.com/p/5",
      timestamp: "2025-07-15T10:00:00+0000",
    },
  ],
}));

// Mock the InstagramPost type import (route file uses NextResponse which is not available in test)
vi.mock("@/app/api/instagram/route", () => ({}));

import { useInstagramFeed } from "@/hooks/useInstagramFeed";

describe("useInstagramFeed", () => {
  it("returns posts from static data", () => {
    const { result } = renderHook(() => useInstagramFeed());
    expect(result.current.posts.length).toBeGreaterThan(0);
  });

  it("returns isLoading as false (static data)", () => {
    const { result } = renderHook(() => useInstagramFeed());
    expect(result.current.isLoading).toBe(false);
  });

  it("returns error as null", () => {
    const { result } = renderHook(() => useInstagramFeed());
    expect(result.current.error).toBeNull();
  });

  it("respects default limit of 9", () => {
    const { result } = renderHook(() => useInstagramFeed());
    // Our mock has 5 items, so all are returned
    expect(result.current.posts).toHaveLength(5);
  });

  it("respects custom limit", () => {
    const { result } = renderHook(() => useInstagramFeed(2));
    expect(result.current.posts).toHaveLength(2);
  });

  it("returns posts with required fields", () => {
    const { result } = renderHook(() => useInstagramFeed());
    result.current.posts.forEach((post) => {
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("media_type");
      expect(post).toHaveProperty("media_url");
      expect(post).toHaveProperty("permalink");
      expect(post).toHaveProperty("timestamp");
    });
  });

  it("includes posts of different media types", () => {
    const { result } = renderHook(() => useInstagramFeed());
    const types = result.current.posts.map((p) => p.media_type);
    expect(types).toContain("IMAGE");
    expect(types).toContain("CAROUSEL_ALBUM");
    expect(types).toContain("VIDEO");
  });

  it("preserves order from source data", () => {
    const { result } = renderHook(() => useInstagramFeed());
    expect(result.current.posts[0]!.id).toBe("1");
    expect(result.current.posts[1]!.id).toBe("2");
  });

  it("handles limit larger than available data", () => {
    const { result } = renderHook(() => useInstagramFeed(100));
    expect(result.current.posts).toHaveLength(5);
  });

  it("handles limit of 0", () => {
    const { result } = renderHook(() => useInstagramFeed(0));
    expect(result.current.posts).toHaveLength(0);
  });
});
