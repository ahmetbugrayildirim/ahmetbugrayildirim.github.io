import Image from 'next/image';
import Link from 'next/link';
import { projects, type Project } from '@/data/site';

export default function ProjectView({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="project wrap">
      <Link className="back" href="/#work">← All work</Link>

      <h1 className="project-title">{project.name}</h1>
      <p className="project-stack">{project.stack.join(', ')}</p>

      {project.image && (
        <Image
          className="project-shot"
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          sizes="(min-width: 1260px) 1200px, 95vw"
        />
      )}

      <div className="project-body">
        <p className="project-lede">{project.summary}</p>
        <p>{project.description}</p>
      </div>

      <Link className="next" href={`/projects/${next.id}`}>
        <span>Next project</span>
        <strong>{next.name}</strong>
      </Link>
    </article>
  );
}
