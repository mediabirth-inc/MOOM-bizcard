import { NextRequest, NextResponse } from 'next/server';
import { getAllPartners, createPartner } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const partners = getAllPartners();
  return NextResponse.json(partners);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, furigana, email, phone } = body;

  if (!name || !furigana || !email || !phone) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const partner = createPartner({ id: uuidv4(), name, furigana, email, phone });
  return NextResponse.json(partner, { status: 201 });
}
