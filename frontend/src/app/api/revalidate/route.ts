import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * ISR Revalidation Webhook.
 *
 * Called by the WordPress plugin (bateau-headless-mode) on save_post.
 * Purges the Next.js ISR cache for the specified path so the page
 * is regenerated on the next visit.
 *
 * Usage: GET /api/revalidate?secret=XXX&path=/fr/evjf-seine
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
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(err) },
      { status: 500 }
    );
  }
}
