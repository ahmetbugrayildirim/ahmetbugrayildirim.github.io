import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="project wrap not-found">
      <h1 className="project-title">Page not found</h1>
      <p>The link may be out of date, or the address has a typo.</p>
      <Link className="btn" href="/">Go to the home page</Link>
    </section>
  );
}
