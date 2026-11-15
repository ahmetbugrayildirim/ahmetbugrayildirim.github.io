import { fullName } from '@/data/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <p>© {new Date().getFullYear()} {fullName}</p>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
