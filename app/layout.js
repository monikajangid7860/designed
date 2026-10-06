import './globals.css';

export const metadata = {
  title: 'Fuori Campo — Immagini in movimento',
  description: 'Un libro indipendente di immagini, persone e luoghi.',
};

export const viewport = {
  themeColor: [
    { media: '(max-width: 760px)', color: '#f8f8f8' },
    { media: '(min-width: 761px)', color: '#ffdd00' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
