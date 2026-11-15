import Link from 'next/link';
import { projects } from '@/data/site';

export default function Work() {
  return (
    <section id="work" className="section wrap">
      <div className="section-head">
        <h2 className="section-title">Selected work</h2>
        <p className="section-note">School and personal projects, from WordPress themes to React apps.</p>
      </div>
      <ul className="work-list">
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`} className="work-link">
              <span className="work-name">{project.name}</span>
              <span className="work-summary">{project.summary}</span>
              <span className="work-stack">{project.stack.join(', ')}</span>
              <span className="work-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
