import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fullName, person } from '@/data/site';
import './globals.css';
import './intro.css';

// Self-hosted by Next.js at build time: no request to Google from the visitor's browser.
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

// Used only inside the code editor on the laptop screen.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: `${fullName} | ${person.title}`,
    template: `%s | ${fullName}`,
  },
  description: person.intro,
  openGraph: {
    title: fullName,
    description: person.headline,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#d8cbb3',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
