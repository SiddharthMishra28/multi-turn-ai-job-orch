import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Inference Orchestrator',
  description: 'Client-side multi-step AI inference chaining platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
