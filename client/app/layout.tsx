import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { AccountProvider } from '@/lib/aws/AccountProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AWS Dev Tools - Cloud tools that just work',
  description: 'Comprehensive AWS management platform with 100+ specialized tools. Cost optimization, security auditing, and performance monitoring - cloud tools that just work.',
  keywords: 'AWS, cloud management, cost optimization, security auditing, performance monitoring, AWS tools',
  openGraph: {
    title: 'AWS Dev Tools - Cloud tools that just work',
    description: 'Comprehensive AWS management platform with 100+ specialized tools. Cost optimization, security auditing, and performance monitoring.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AWS Dev Tools - Cloud tools that just work',
    description: 'Comprehensive AWS management platform with 100+ specialized tools.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <AccountProvider>
            {children}
          </AccountProvider>
        </AuthProvider>
      </body>
    </html>
  );
}