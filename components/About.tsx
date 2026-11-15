import Image from 'next/image';
import headshot from '@/assets/bugra-headshot.webp';
import { about, fullName, skills } from '@/data/site';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="wrap about">
        <div className="about-intro">
          <h2 className="section-title">About</h2>
          <Image
            className="about-photo"
            src={headshot}
            alt={`Photo of ${fullName}`}
            sizes="(min-width: 900px) 18rem, 60vw"
          />
        </div>
        <div className="about-body">
          {about.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
        <dl className="skills">
          {skills.map((group) => (
            <div key={group.group} className="skill-group">
              <dt>{group.group}</dt>
              <dd>{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
