import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * All supported locales — must match src/i18n/routing.ts
 */
const LOCALES = ["fr", "en", "es", "it", "de", "pt-BR"] as const;

/**
 * Regex that matches a leading locale segment in a path.
 * Handles both simple codes (fr, en, …) and regional codes (pt-BR).
 */
const LOCALE_PREFIX_RE = /^\/([a-z]{2}(?:-[A-Z]{2})?)(\/|$)/;

/**
 * ISR Revalidation Webhook.
 *
 * Called by the WordPress plugin (bateau-headless-mode) on save_post.
 * Purges the Next.js ISR cache for the specified path across ALL locales
 * so the page is regenerated on the next visit in every language.
 *
 * Usage: GET /api/revalidate?secret=XXX&path=/fr/evjf-seine
 *
 * The path can be locale-prefixed (e.g. /fr/actualites) or bare
 * (e.g. /actualites). In both cases every locale variant is revalidated.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");

  // Validate secret
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json(
      { error: "Missing path parameter" },
      { status: 400 }
    );
  }

  try {
    // Strip the locale prefix (if any) to get the locale-agnostic suffix.
    // "/fr/actualites/my-post" → "/actualites/my-post"
    // "/actualites/my-post"    → "/actualites/my-post"
    const match = path.match(LOCALE_PREFIX_RE);
    const localeSegment = match?.[1];
    const suffix = localeSegment ? path.slice(localeSegment.length + 1) : path; // keeps leading "/"

    // Revalidate every locale variant
    const revalidated: string[] = [];

    for (const locale of LOCALES) {
      const localePath = `/${locale}${suffix === "/" ? "" : suffix}`;
      revalidatePath(localePath);
      revalidated.push(localePath);
    }

    return NextResponse.json({ revalidated: true, paths: revalidated });
  } catch (err) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(err) },
      { status: 500 }
    );
  }
}
