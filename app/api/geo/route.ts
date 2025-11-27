import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const geo = geolocation(request);

    // Use Vercel geolocation when available, otherwise fall back to header or US.
    const countryHeader = request.headers.get("x-vercel-ip-country");
    const rawCountry = geo.country || countryHeader;
    const country = /^[A-Z]{2}$/.test((rawCountry || "").toUpperCase())
      ? (rawCountry as string).toUpperCase()
      : "US";

    return NextResponse.json({ ...geo, country });
  } catch {
    // Local/dev fallback when Vercel geo is unavailable.
    return NextResponse.json({ country: "US" });
  }
}
