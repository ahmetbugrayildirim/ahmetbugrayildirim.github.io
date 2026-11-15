import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectView from '@/components/ProjectView';
import { getProject, projects } from '@/data/site';

type Props = { params: Promise<{ id: string }> };

// Pre-builds one page per project at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).id);
  return project ? { title: project.name, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).id);
  if (!project) notFound();
  return <ProjectView project={project} />;
}
