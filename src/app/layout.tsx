import { Press_Start_2P } from 'next/font/google';
import './globals.css';

const pixelFont = Press_Start_2P({ 
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-pixel'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={pixelFont.variable}>
      <body className="bg-black text-white antialiased font-pixel">
        {children}
      </body>
    </html>
  );
}