'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Partner } from '@/lib/db';

export default function AdminPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function loadPartners() {
    const res = await fetch('/api/partners');
    const data = await res.json();
    setPartners(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPartners();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('このパートナーを削除しますか？')) return;
    setDeleteId(id);
    await fetch(`/api/partners/${id}`, { method: 'DELETE' });
    await loadPartners();
    setDeleteId(null);
  }

  function copyLink(id: string) {
    const url = `${window.location.origin}/card/${id}`;
    navigator.clipboard.writeText(url);
    alert('リンクをコピーしました');
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
          <Link
            href="/admin/new"
            className="flex items-center gap-2 text-sm font-medium text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-80"
            style={{ background: '#4E8C8C' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            新規登録
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-light tracking-wide mb-1" style={{ color: '#1A1A1A' }}>
          パートナー一覧
        </h1>
        <p className="text-sm text-gray-400 mb-8">登録されたパートナーの電子名刺を管理します</p>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">読み込み中...</div>
        ) : partners.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#ABABAB20' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#ABABAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gray-400 text-sm mb-4">パートナーが登録されていません</p>
            <Link href="/admin/new" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#4E8C8C' }}>
              最初のパートナーを登録する →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ background: '#4E8C8C' }}>
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm" style={{ color: '#1A1A1A' }}>{partner.name}</span>
                      <span className="text-xs text-gray-400">{partner.furigana}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{partner.email} · {partner.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyLink(partner.id)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}
                    title="リンクをコピー"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    リンク
                  </button>
                  <Link
                    href={`/card/${partner.id}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    プレビュー
                  </Link>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    disabled={deleteId === partner.id}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-red-50"
                    style={{ borderColor: '#E5E5E5', color: '#999' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function MoomLogo() {
  return (
    <svg width="92" height="28" viewBox="0 0 230 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* M */}
      <rect x="0" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      <path d="M10 20 Q25 50 32 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M32 20 Q39 50 54 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <rect x="44" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      {/* first O */}
      <ellipse cx="86" cy="40" rx="18" ry="18" stroke="#1A1A1A" strokeWidth="10" fill="none"/>
      {/* second O */}
      <ellipse cx="134" cy="40" rx="18" ry="18" stroke="#1A1A1A" strokeWidth="10" fill="none"/>
      {/* M */}
      <rect x="162" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      <path d="M172 20 Q187 50 194 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M194 20 Q201 50 206 20" stroke="#1A1A1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <rect x="206" y="20" width="10" height="40" rx="5" fill="#1A1A1A"/>
      {/* Teal dot */}
      <circle cx="222" cy="14" r="7" fill="#4E8C8C"/>
    </svg>
  );
}
