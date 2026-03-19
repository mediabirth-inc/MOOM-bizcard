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
    <div className="min-h-screen flex" style={{ background: '#F0EFED' }}>
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full flex flex-col"
        style={{ width: 240, background: '#1A1A1A', zIndex: 10 }}
      >
        <div className="flex flex-col flex-1 px-8 py-10">
          {/* Logo */}
          <div className="mb-12">
            <MoomLogoWhite />
            <span
              className="block mt-2 text-[10px] tracking-[0.3em] uppercase"
              style={{ color: '#4E8C8C' }}
            >
              Admin
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/5"
              style={{ color: '#888' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm">パートナー一覧</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1" style={{ marginLeft: 240 }}>
        {/* Top bar */}
        <header
          className="sticky top-0 z-10 flex items-center justify-between px-10 py-5"
          style={{ background: '#F0EFED', borderBottom: '1px solid #E5E4E0' }}
        >
          <div>
            <h1 className="text-xl font-light" style={{ color: '#1A1A1A' }}>パートナー新規登録</h1>
            <p className="text-xs mt-0.5" style={{ color: '#ABABAB' }}>情報を入力すると電子名刺が自動生成されます</p>
          </div>
          <Link
            href="/admin"
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: '#ABABAB' }}
          >
            ← 一覧に戻る
          </Link>
        </header>

        {/* Content */}
        <main className="px-10 py-10">
          <div className="max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: '#ABABAB' }}>
                  氏名 *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="山田 太郎"
                  required
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    color: '#1A1A1A',
                    border: '1px solid #E5E4E0',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#4E8C8C')}
                  onBlur={e => (e.target.style.borderColor = '#E5E4E0')}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: '#ABABAB' }}>
                  ふりがな / English Name *
                </label>
                <input
                  type="text"
                  value={form.furigana}
                  onChange={e => setForm({ ...form, furigana: e.target.value })}
                  placeholder="Taro Yamada"
                  required
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    color: '#1A1A1A',
                    border: '1px solid #E5E4E0',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#4E8C8C')}
                  onBlur={e => (e.target.style.borderColor = '#E5E4E0')}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: '#ABABAB' }}>
                  メールアドレス *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="taro.yamada@example.com"
                  required
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    color: '#1A1A1A',
                    border: '1px solid #E5E4E0',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#4E8C8C')}
                  onBlur={e => (e.target.style.borderColor = '#E5E4E0')}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: '#ABABAB' }}>
                  電話番号 *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="090-1234-5678"
                  required
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    color: '#1A1A1A',
                    border: '1px solid #E5E4E0',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#4E8C8C')}
                  onBlur={e => (e.target.style.borderColor = '#E5E4E0')}
                />
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white text-sm font-medium py-3.5 rounded-full transition-opacity hover:opacity-80 disabled:opacity-50"
                  style={{ background: '#4E8C8C' }}
                >
                  {loading ? '生成中...' : '電子名刺を生成する'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function MoomLogoWhite() {
  return (
    <svg width="92" height="28" viewBox="0 0 230 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="20" width="10" height="40" rx="5" fill="#ffffff"/>
      <path d="M10 20 Q25 50 32 20" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M32 20 Q39 50 54 20" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <rect x="44" y="20" width="10" height="40" rx="5" fill="#ffffff"/>
      <ellipse cx="86" cy="40" rx="18" ry="18" stroke="#ffffff" strokeWidth="10" fill="none"/>
      <ellipse cx="134" cy="40" rx="18" ry="18" stroke="#ffffff" strokeWidth="10" fill="none"/>
      <rect x="162" y="20" width="10" height="40" rx="5" fill="#ffffff"/>
      <path d="M172 20 Q187 50 194 20" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M194 20 Q201 50 206 20" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <rect x="206" y="20" width="10" height="40" rx="5" fill="#ffffff"/>
      <circle cx="222" cy="14" r="7" fill="#4E8C8C"/>
    </svg>
  );
}
