import { getPartner } from '@/lib/db';
import { notFound } from 'next/navigation';
import CardView from './CardView';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = getPartner(id);
  if (!partner) return { title: 'Not Found' };
  return {
    title: `${partner.name} | MOOM`,
    description: `${partner.name}の電子名刺`,
  };
}

export default async function CardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = getPartner(id);
  if (!partner) notFound();

  return <CardView partner={partner} />;
}
