import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const currency = searchParams.get("currency");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    let qb = supabase.from("products_vector").select("*", { count: "exact" });

    if (query) {
      qb = qb.or(
        `item_number.ilike.%${query}%,item_description.ilike.%${query}%`
      );
    }

    if (currency) {
      qb = qb.eq("currency", currency);
    }

    const { data, error, count } = await qb.range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      total: count,
      page,
      limit,
      pages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
