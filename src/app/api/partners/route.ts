import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — Public list of partners
export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json(partners);
}

// POST — Create partner (admin only)
export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { name, description, website, logoUrl, order } = await req.json();

  if (!name || !logoUrl) {
    return NextResponse.json(
      { error: "Nom et logo requis." },
      { status: 400 }
    );
  }

  const partner = await prisma.partner.create({
    data: {
      name,
      description: description ?? "",
      website: website ?? "",
      logoUrl,
      order: order ?? 0,
    },
  });

  return NextResponse.json(partner, { status: 201 });
}
