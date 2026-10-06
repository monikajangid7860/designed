import './globals.css';

export const metadata = {
  title: 'Fuori Campo — Immagini in movimento',
  description: 'Un libro indipendente di immagini, persone e luoghi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}