import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'partners.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS partners (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        furigana TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
  }
  return db;
}

export interface Partner {
  id: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  created_at: string;
}

export function getAllPartners(): Partner[] {
  return getDb().prepare('SELECT * FROM partners ORDER BY created_at DESC').all() as Partner[];
}

export function getPartner(id: string): Partner | undefined {
  return getDb().prepare('SELECT * FROM partners WHERE id = ?').get(id) as Partner | undefined;
}

export function createPartner(data: Omit<Partner, 'created_at'>): Partner {
  const stmt = getDb().prepare(
    'INSERT INTO partners (id, name, furigana, email, phone) VALUES (?, ?, ?, ?, ?)'
  );
  stmt.run(data.id, data.name, data.furigana, data.email, data.phone);
  return getPartner(data.id)!;
}

export function deletePartner(id: string): void {
  getDb().prepare('DELETE FROM partners WHERE id = ?').run(id);
}
