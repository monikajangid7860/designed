const links = [
  { label: 'ABOUT', className: 'edge-nav__about' },
  { label: 'PITTORI', className: 'edge-nav__pittori' },
  { label: 'EVENTI', className: 'edge-nav__eventi' },
  { label: 'BOOK', className: 'edge-nav__book' },
];

export default function Navigation() {
  return (
    <nav className="edge-nav" aria-label="Navigazione principale">
      {links.map(({ label, className }) => (
        <a className={className} href="#continuation" key={label}>
          {label}
        </a>
      ))}
    </nav>
  );
}