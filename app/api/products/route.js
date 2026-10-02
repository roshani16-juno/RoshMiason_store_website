import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  let result = [...products];
  if (category && category !== "All") result = result.filter((p) => p.category === category);
  if (q) result = result.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return NextResponse.json(result);
}