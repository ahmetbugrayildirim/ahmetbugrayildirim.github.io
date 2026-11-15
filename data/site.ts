import type { StaticImageData } from 'next/image';
import gameShot from '@/assets/javascript-game.jpg';
import mindsetShot from '@/assets/mindset.jpg';

export type Project = {
  /** Used in the page address: /projects/<id>. Must be unique. */
  id: string;
  name: string;
  stack: string[];
  summary: string;
  description: string;
  image?: StaticImageData;
};

export type SkillGroup = { group: string; items: string[] };
export type Highlight = { label: string; value: string };
export type SocialLink = { label: string; href: string };

export const person = {
  firstNames: 'Bugra',
  lastName: 'Yildirim',
  role: 'Computer Science student, University of Victoria',
  title: 'Software engineer and Computer Science student',
  email: 'ahmet.bugra.yildirim02@gmail.com',
  headline: 'I build fast, accessible web apps with TypeScript, React and Next.js.',
  intro:
    'I study Computer Science at the University of Victoria and build for the web with TypeScript, React and Next.js. Off screen, I train jiu-jitsu and lift.',
};

export const fullName = `${person.firstNames} ${person.lastName}`;

/** Short facts shown under the hero. */
export const highlights: Highlight[] = [
  { label: 'Studying', value: 'Computer Science, University of Victoria' },
  { label: 'Before that', value: 'Front End Web Developer program, BCIT' },
  { label: 'Builds with', value: 'TypeScript, React, Next.js, PHP' },
];

// TODO: replace with your own profile URLs.
export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/' },
];

export const about: string[] = [
  'I’m a Computer Science student at the University of Victoria. I like the part of software people actually touch: interfaces that load fast, read clearly and work for everyone.',
  'Before UVic I studied front-end web development at BCIT, building sites in React, JavaScript and WordPress and designing them in Figma. Now I’m adding the computer science underneath.',
  'Outside of code I train jiu-jitsu and lift. Both reward what good engineering does: showing up, drilling the basics, and getting a little better every week.',
];

export const projects: Project[] = [
  {
    id: 'capstone',
    name: 'Capstone Project',
    stack: ['WordPress', 'PHP', 'CSS'],
    summary: 'A website for a Toronto cupcake shop, from design brief to finished build.',
    description:
      'Starting from a design brief for a Toronto cupcake shop, the goal was a site that is easy to use, good to look at, and makes the cupcakes look delicious. I built it on WordPress with a custom PHP theme and hand-written CSS.',
  },
  {
    id: 'game',
    name: 'Memory Game',
    stack: ['JavaScript', 'HTML', 'CSS'],
    image: gameShot,
    summary: 'A flip-card game in plain JavaScript. Match every pair to win.',
    description:
      'A memory game written in plain JavaScript with no libraries. Flip two cards to reveal their symbols, match the pairs, and try to clear the board in as few moves as possible. The move counter and game state are handled entirely in the browser.',
  },
  {
    id: 'mindset',
    name: 'Mindset',
    stack: ['WordPress', 'PHP', 'CSS'],
    image: mindsetShot,
    summary: 'A WordPress theme with featured work, services and a blog.',
    description:
      'Mindset is a WordPress project with a custom theme written in PHP and CSS. It includes a featured works gallery, a services page, a blog and a contact page, all editable from the WordPress dashboard.',
  },
  {
    id: 'movie',
    name: 'Movie Database',
    stack: ['React', 'JavaScript', 'CSS'],
    summary: 'A React app for browsing and exploring a large movie database.',
    description:
      'A movie database website built with React. Reusable components display titles from a large movie database so visitors can browse, search and explore films.',
  },
  {
    id: 'calculator',
    name: 'React Calculator',
    stack: ['React', 'JavaScript', 'CSS'],
    summary: 'A clean, simple calculator built with React state.',
    description:
      'A calculator built with React. Component state drives the display, and the layout is kept simple so calculating stays quick on any screen size.',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    stack: ['Next.js', 'TypeScript', 'CSS'],
    summary: 'This site: designed and built from scratch.',
    description:
      'The site you are on. Built with Next.js and TypeScript and exported as a fast static site. One data file holds every project and skill, so adding new work takes a minute.',
  },
];

export const skills: SkillGroup[] = [
  {
    group: 'Development',
    items: ['HTML5', 'CSS3', 'SASS', 'Bootstrap', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'PHP', 'WordPress'],
  },
  { group: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop'] },
  { group: 'Off screen', items: ['Jiu-jitsu', 'Fitness'] },
];

export const getProject = (id: string) => projects.find((project) => project.id === id);
