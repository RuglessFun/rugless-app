import type { Metadata } from 'next';
import { OriginalRoadmap } from '@/components/original/roadmap';
export const metadata: Metadata = { title: 'Roadmap' };
export default function Roadmap() {
  return <OriginalRoadmap />;
}
