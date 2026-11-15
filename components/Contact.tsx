import { person, socialLinks } from '@/data/site';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap contact-grid">
        <h2 className="contact-title">Have a project or a role in mind? Let’s talk.</h2>
        <div>
          <a className="contact-email" href={`mailto:${person.email}`}>{person.email}</a>
          <ul className="contact-social">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
