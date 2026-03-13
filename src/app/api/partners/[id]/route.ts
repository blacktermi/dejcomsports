import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import { join } from "path";

type Ctx = { params: Promise<{ id: string }> };

// PATCH — Update partner
export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.description !== undefined) data.description = body.description;
  if (body.website !== undefined) data.website = body.website;
  if (body.logoUrl !== undefined) data.logoUrl = body.logoUrl;
  if (body.order !== undefined) data.order = body.order;

  const partner = await prisma.partner.update({ where: { id }, data });
  return NextResponse.json(partner);
}

// DELETE — Remove partner
export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await ctx.params;

  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }

  // Delete the logo file if it's in uploads
  if (partner.logoUrl.startsWith("/uploads/")) {
    try {
      await unlink(join(process.cwd(), "public", partner.logoUrl));
    } catch {
      // file may already be deleted
    }
  }

  await prisma.partner.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
