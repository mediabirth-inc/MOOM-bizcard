import { neon } from '@neondatabase/serverless';

export interface Partner {
  id: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  created_at: string;
}

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
}

async function ensureTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS partners (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      furigana TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (NOW()::text)
    )
  `;
}

export async function getAllPartners(): Promise<Partner[]> {
  await ensureTable();
  const sql = getDb();
  const rows = await sql`SELECT * FROM partners ORDER BY created_at DESC`;
  return rows as Partner[];
}

export async function getPartner(id: string): Promise<Partner | undefined> {
  await ensureTable();
  const sql = getDb();
  const rows = await sql`SELECT * FROM partners WHERE id = ${id}`;
  return rows[0] as Partner | undefined;
}

export async function createPartner(data: Omit<Partner, 'created_at'>): Promise<Partner> {
  await ensureTable();
  const sql = getDb();
  const rows = await sql`
    INSERT INTO partners (id, name, furigana, email, phone)
    VALUES (${data.id}, ${data.name}, ${data.furigana}, ${data.email}, ${data.phone})
    RETURNING *
  `;
  return rows[0] as Partner;
}

export async function deletePartner(id: string): Promise<void> {
  await ensureTable();
  const sql = getDb();
  await sql`DELETE FROM partners WHERE id = ${id}`;
}
