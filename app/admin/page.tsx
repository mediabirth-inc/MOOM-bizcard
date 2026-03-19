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
    <div className="min-h-screen flex" style={{ background: '#F0EFED' }}>
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full flex flex-col"
        style={{ width: 240, background: '#ffffff', borderRight: '1px solid #E5E4E0', zIndex: 10 }}
      >
        <div className="flex flex-col flex-1 px-8 py-10">
          {/* Logo */}
          <div className="mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/moom-logo.svg" alt="MOOM" style={{ height: 28 }} />
            <span
              className="block mt-2 text-[10px] tracking-[0.3em] uppercase"
              style={{ color: '#4E8C8C' }}
            >
              Admin
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: '#F0EFED' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#4E8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>パートナー一覧</span>
            </div>
          </nav>

          {/* Count badge */}
          {!loading && (
            <div
              className="mt-auto px-4 py-3 rounded-xl text-center"
              style={{ background: '#F0EFED' }}
            >
              <span className="block text-3xl font-light" style={{ color: '#4E8C8C' }}>{partners.length}</span>
              <span className="block text-[11px] mt-0.5" style={{ color: '#ABABAB' }}>登録済みパートナー</span>
            </div>
          )}
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
            <h1 className="text-xl font-light" style={{ color: '#1A1A1A' }}>パートナー一覧</h1>
            <p className="text-xs mt-0.5" style={{ color: '#ABABAB' }}>登録されたパートナーの電子名刺を管理します</p>
          </div>
          <Link
            href="/admin/new"
            className="flex items-center gap-2 text-sm font-medium text-white px-6 py-3 rounded-full transition-opacity hover:opacity-80"
            style={{ background: '#4E8C8C' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            新規登録
          </Link>
        </header>

        {/* Content */}
        <main className="px-10 py-8">
          {loading ? (
            <div className="text-center py-20 text-sm" style={{ color: '#ABABAB' }}>読み込み中...</div>
          ) : partners.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: '#ffffff', border: '1px solid #E5E4E0' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm mb-2" style={{ color: '#ABABAB' }}>パートナーが登録されていません</p>
              <Link
                href="/admin/new"
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: '#4E8C8C' }}
              >
                最初のパートナーを登録する →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {partners.map((partner, i) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-2xl px-6 py-5 flex items-center justify-between"
                  style={{ border: '1px solid #E5E4E0' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs w-5 text-right" style={{ color: '#CCCCCC' }}>{i + 1}</span>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                        style={{ background: '#4E8C8C' }}
                      >
                        {partner.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm" style={{ color: '#1A1A1A' }}>{partner.name}</span>
                        <span className="text-xs" style={{ color: '#ABABAB' }}>{partner.furigana}</span>
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#ABABAB' }}>
                        {partner.email} · {partner.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyLink(partner.id)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors hover:bg-gray-50"
                      style={{ border: '1px solid #E5E4E0', color: '#666' }}
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
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors hover:bg-gray-50"
                      style={{ border: '1px solid #E5E4E0', color: '#666' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      プレビュー
                    </Link>
                    <button
                      onClick={() => handleDelete(partner.id)}
                      disabled={deleteId === partner.id}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors hover:bg-red-50"
                      style={{ border: '1px solid #E5E4E0', color: '#CCCCCC' }}
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
    </div>
  );
}
