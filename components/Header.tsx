import Link from 'next/link';
import { fullName } from '@/data/site';

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link className="wordmark" href="/">{fullName}</Link>
        <nav aria-label="Main">
          <ul className="nav">
            {navItems.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
            <li><Link className="nav-cta" href="/#contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
