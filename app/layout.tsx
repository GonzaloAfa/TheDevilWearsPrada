import './globals.css';
import { LangHtmlUpdater } from '../components/LangHtmlUpdater';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LangHtmlUpdater />
        {children}
      </body>
    </html>
  );
}
