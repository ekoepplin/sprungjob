import { NextRequest, NextResponse } from "next/server";
import { searchDesignJobs } from "@/lib/jobsuche";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ort = searchParams.get("ort") ?? undefined;
  const spezialisierung = searchParams.get("spezialisierung") ?? undefined;
  const page = Number(searchParams.get("page") ?? "1");

  try {
    const result = await searchDesignJobs({ ort, spezialisierung, page });
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Jobsuche derzeit nicht erreichbar." },
      { status: 502 },
    );
  }
}
