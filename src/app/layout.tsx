import type { Metadata } from 'next';
import { StorageProvider } from '@/lib/storage/StorageContext';
import { AppShell } from '@/components/shell/AppShell';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'RECLAIM — E-Waste Intelligence & Management Studio',
  description:
    'Academic coursework portfolio for 15 EW/EM assignments with interactive document inspection and verified deliverables.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body>
        <StorageProvider>
          <AppShell>{children}</AppShell>
        </StorageProvider>
      </body>
    </html>
  );
}
