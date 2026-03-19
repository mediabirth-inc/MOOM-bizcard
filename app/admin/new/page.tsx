'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPartnerPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', furigana: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'エラーが発生しました');
      setLoading(false);
      return;
    }

    const partner = await res.json();
    router.push(`/card/${partner.id}`);
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F8F7' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MoomLogo />
            <span className="text-xs tracking-[0.2em] text-gray-400 font-light uppercase mt-1">Admin</span>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← 一覧に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-14">
        <h1 className="text-2xl font-light tracking-wide mb-1" style={{ color: '#1A1A1A' }}>
          パートナー新規登録
        </h1>
        <p className="text-sm text-gray-400 mb-10">情報を入力すると電子名刺が自動生成されます</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#ABABAB' }}>
              氏名 *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="山田 太郎"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4E8C8C] transition-colors"
              style={{ color: '#1A1A1A' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#ABABAB' }}>
              ふりがな / English Name *
            </label>
            <input
              type="text"
              value={form.furigana}
              onChange={e => setForm({ ...form, furigana: e.target.value })}
              placeholder="Taro Yamada"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4E8C8C] transition-colors"
              style={{ color: '#1A1A1A' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#ABABAB' }}>
              メールアドレス *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="taro.yamada@example.com"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4E8C8C] transition-colors"
              style={{ color: '#1A1A1A' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#ABABAB' }}>
              電話番号 *
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="090-1234-5678"
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4E8C8C] transition-colors"
              style={{ color: '#1A1A1A' }}
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white text-sm font-medium py-3.5 rounded-full transition-opacity hover:opacity-80 disabled:opacity-50 mt-4"
            style={{ background: '#4E8C8C' }}
          >
            {loading ? '生成中...' : '電子名刺を生成する'}
          </button>
        </form>
      </main>
    </div>
  );
}

function MoomLogo() {
  return (
    <svg width="92" height="28" viewBox="0 0 230 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      <path d="M10 20 Q25 50 32 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M32 20 Q39 50 54 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <rect x="44" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      <ellipse cx="86" cy="40" rx="18" ry="18" stroke="#1A1A1A" strokeWidth="10" fill="none"/>
      <ellipse cx="134" cy="40" rx="18" ry="18" stroke="#1A1A1A" strokeWidth="10" fill="none"/>
      <rect x="162" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      <path d="M172 20 Q187 50 194 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M194 20 Q201 50 206 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <rect x="206" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      <circle cx="222" cy="14" r="7" fill="#4E8C8C"/>
    </svg>
  );
}
