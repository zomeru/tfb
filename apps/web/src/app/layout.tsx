import '../styles/globals.css';
// include styles from the ui package
import 'ui/styles.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`min-h-screen min-w-screen ${inter.className}`}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
