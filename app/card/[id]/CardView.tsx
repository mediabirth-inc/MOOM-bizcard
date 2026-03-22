'use client';

import { useState, useRef, useEffect } from 'react';
import { Partner } from '@/lib/db';

interface Props {
  partner: Partner;
}

export default function CardView({ partner }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function generateQr() {
      const QRCode = (await import('qrcode')).default;
      const url = window.location.href;
      const dataUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 1,
        color: { dark: '#1A1A1A', light: '#FFFFFF' },
      });
      setQrDataUrl(dataUrl);
    }
    generateQr();
  }, []);

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownloadCard() {
    const { toPng } = await import('html-to-image');
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
    const link = document.createElement('a');
    link.download = `MOOM_${partner.name}_bizcard.png`;
    link.href = dataUrl;
    link.click();
  }

  function handleDownloadVcf() {
    const nameParts = partner.furigana.trim().split(/\s+/);
    const lastName = nameParts[0] || '';
    const firstName = nameParts.slice(1).join(' ') || '';

    const vcf = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${partner.name}`,
      `N:${lastName};${firstName};;;`,
      `EMAIL:${partner.email}`,
      `TEL:${partner.phone}`,
      'ORG:株式会社エフワンコンサルティング',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcf], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${partner.name}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4" style={{ background: '#F8F8F7' }}>
      {/* Business Card */}
      <div
        ref={cardRef}
        className="relative w-full bg-white overflow-hidden"
        style={{
          maxWidth: 480,
          aspectRatio: '1.618 / 1',
          borderRadius: 20,
          boxShadow: '0 8px 60px rgba(0,0,0,0.10)',
        }}
      >
        {/* Teal accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: '#4E8C8C' }} />

        {/* Logo + Company */}
        <div className="absolute" style={{ top: 28, left: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/moom-logo.svg" alt="MOOM" style={{ height: 18 }} />
          <p className="mt-1.5 font-light" style={{ fontSize: 9, color: '#1A1A1A', letterSpacing: '0.04em' }}>
            株式会社エフワンコンサルティング
          </p>
          <p className="mt-0.5 font-light" style={{ fontSize: 8, color: '#ABABAB', letterSpacing: '0.04em' }}>
            大阪府知事免許 (1) 第65175号
          </p>
        </div>

        {/* Name block */}
        <div className="absolute" style={{ bottom: 48, left: 36, right: 120 }}>
          <p
            className="font-light tracking-[0.05em] leading-tight"
            style={{ fontSize: 26, color: '#1A1A1A', letterSpacing: '0.03em' }}
          >
            {partner.name}
          </p>
          <p
            className="mt-1 font-light"
            style={{ fontSize: 11, color: '#ABABAB', letterSpacing: '0.12em' }}
          >
            {partner.furigana}
          </p>
        </div>

        {/* Contact info */}
        <div className="absolute flex flex-col gap-1.5" style={{ bottom: 36, right: 36 }}>
          <div className="flex items-center gap-2 justify-end">
            <span style={{ fontSize: 10, color: '#ABABAB', letterSpacing: '0.05em' }}>{partner.email}</span>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4E8C8C', flexShrink: 0 }} />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span style={{ fontSize: 10, color: '#ABABAB', letterSpacing: '0.05em' }}>{partner.phone}</span>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ABABAB', flexShrink: 0 }} />
          </div>
        </div>

        {/* Subtle gray circle decoration */}
        <div
          className="absolute"
          style={{
            bottom: -40,
            left: -40,
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: '#ABABAB12',
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col items-center gap-3 w-full" style={{ maxWidth: 480 }}>
        <div className="flex gap-3 w-full">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-full border transition-all"
            style={{ borderColor: '#1A1A1A', color: '#1A1A1A', background: 'transparent' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {copied ? 'コピーしました！' : 'リンクをコピー'}
          </button>
          <button
            onClick={() => setShowQr(!showQr)}
            className="flex items-center justify-center gap-2 text-sm font-medium py-3 px-5 rounded-full border transition-all"
            style={{ borderColor: '#1A1A1A', color: '#1A1A1A', background: 'transparent' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3zM18 18v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            QR
          </button>
        </div>

        {/* QR Code panel */}
        {showQr && qrDataUrl && (
          <div className="w-full bg-white rounded-2xl p-6 flex flex-col items-center gap-3" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            <p className="text-xs tracking-widest uppercase text-gray-400">QR コード</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR Code" width={160} height={160} />
            <p className="text-xs text-gray-400">スキャンして名刺ページを開く</p>
          </div>
        )}

        <div className="flex gap-3 w-full">
          <button
            onClick={handleDownloadCard}
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-white py-3 rounded-full transition-opacity hover:opacity-80"
            style={{ background: '#4E8C8C' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            画像でダウンロード
          </button>
          <button
            onClick={handleDownloadVcf}
            className="flex items-center justify-center gap-2 text-sm font-medium py-3 px-5 rounded-full border transition-all hover:bg-gray-50"
            style={{ borderColor: '#ABABAB', color: '#1A1A1A' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            vCard
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-10 text-xs text-gray-300 tracking-widest uppercase">MOOM</p>
    </div>
  );
}
