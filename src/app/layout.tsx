import type { Metadata } from 'next';
import { StorageProvider } from '@/lib/storage/StorageContext';
import { AppShell } from '@/components/shell/AppShell';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'RECLAIM — E-Waste Intelligence & Management Studio',
  description:
    'Independent coursework intelligence studio for 14 EW/EM assignments with dual-truth verification and faculty showcase.',
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
