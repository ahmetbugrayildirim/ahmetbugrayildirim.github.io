'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { fullName, person } from '@/data/site';

/* ---------- Code the editor "types" ---------- */
const files = [
  {
    name: 'page.tsx',
    path: 'app/page.tsx',
    code: `import { Hero, Projects, Contact } from '@/components';

// The person behind this laptop
const engineer = {
  name: '${fullName}',
  studying: 'Computer Science @ UVic',
  stack: ['TypeScript', 'React', 'Next.js'],
  offScreen: ['Jiu-jitsu', 'Fitness'],
  openToWork: true,
};

export default function Home() {
  return (
    <main>
      <Hero who={engineer} />
      <Projects featured />
      <Contact email="${person.email}" />
    </main>
  );
}`,
  },
  {
    name: 'useTyping.ts',
    path: 'hooks/useTyping.ts',
    code: `import { useEffect, useState } from 'react';

// Types text out one character at a time
export function useTyping(text: string, speed = 40) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return shown;
}`,
  },
];

/* ---------- Tiny syntax highlighter ---------- */
const TOKEN =
  /(\/\/[^\n]*)|('[^'\n]*'?|"[^"\n]*"?)|\b(import|from|const|let|export|default|function|return|true|false|useEffect|useState)\b|(<\/?[A-Za-z]\w*|\/?>)|(\b\d+\b)|(\b[a-zA-Z_]\w*(?=\())/g;
const CLASSES = ['', 'tk-comment', 'tk-string', 'tk-keyword', 'tk-tag', 'tk-number', 'tk-fn'];

function highlight(line: string) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(line.slice(last, i));
    const group = m.slice(1).findIndex((g) => g !== undefined) + 1;
    out.push(<span key={i} className={CLASSES[group]}>{m[0]}</span>);
    last = i + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/* ---------- Live clock for the menu bar ---------- */
function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);
  return now
    ? now.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })
    : '';
}

/* ---------- Typing loop ---------- */
function useEditorLoop(reduceMotion: boolean) {
  const [fileIndex, setFileIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [compiles, setCompiles] = useState(0);
  const code = files[fileIndex].code;

  useEffect(() => {
    if (reduceMotion) {
      setTyped(code.length);
      return;
    }
    if (typed >= code.length) {
      setCompiles((c) => c + 1);
      const id = setTimeout(() => {
        setFileIndex((f) => (f + 1) % files.length);
        setTyped(0);
      }, 3200);
      return () => clearTimeout(id);
    }
    const char = code[typed];
    const delay = char === '\n' ? 260 : 22 + Math.random() * 55;
    const id = setTimeout(() => setTyped((t) => t + 1), delay);
    return () => clearTimeout(id);
  }, [typed, code, reduceMotion]);

  return { file: files[fileIndex], fileIndex, visible: code.slice(0, typed), done: typed >= code.length, compiles };
}

export default function Screen({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const clock = useClock();
  const { file, fileIndex, visible, done, compiles } = useEditorLoop(reduceMotion);
  const lines = useMemo(() => visible.split('\n'), [visible]);
  const compileMs = useMemo(() => 180 + ((compiles * 137) % 420), [compiles]);

  const menuBar = (
    <div className="mac-menubar">
      <span className="mac-menubar-left">
        <b>Code</b><span>File</span><span>Edit</span><span>View</span><span>Terminal</span>
      </span>
      <span className="mac-menubar-right">
        <svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.4 6.8a6.5 6.5 0 0 1 9.2 0l-1.1 1.1a5 5 0 0 0-7 0zM1.2 4.6a9.6 9.6 0 0 1 13.6 0l-1.1 1.1a8 8 0 0 0-11.4 0z" fill="currentColor"/></svg>
        <svg viewBox="0 0 26 12" aria-hidden="true"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor"/><rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor"/></svg>
        <span suppressHydrationWarning>{clock}</span>
      </span>
    </div>
  );

  return (
    <div className="screen-inner" aria-hidden="true">
      {/* Layer 1: code editor */}
      <div className="screen-layer screen-code">
        {menuBar}
        <div className="ide">
          <div className="ide-titlebar">
            <span className="lights"><i /><i /><i /></span>
            <span className="ide-title">bugra-portfolio</span>
          </div>
          <div className="ide-body">
            <aside className="ide-sidebar">
              <p className="ide-sidebar-head">Explorer</p>
              <ul>
                <li>▾ app</li>
                <li className={fileIndex === 0 ? 'is-active' : ''}>　page.tsx</li>
                <li>　layout.tsx</li>
                <li>▸ components</li>
                <li>▾ hooks</li>
                <li className={fileIndex === 1 ? 'is-active' : ''}>　useTyping.ts</li>
                <li>▸ data</li>
                <li>package.json</li>
                <li>tsconfig.json</li>
              </ul>
            </aside>
            <div className="ide-main">
              <div className="ide-tabs">
                {files.map((f, i) => (
                  <span key={f.name} className={i === fileIndex ? 'is-active' : ''}>{f.name}</span>
                ))}
              </div>
              <pre className="ide-code">
                {lines.map((line, i) => (
                  <div key={i} className="ide-line">
                    <span className="ide-ln">{i + 1}</span>
                    <span>
                      {highlight(line)}
                      {i === lines.length - 1 && <span className="caret" />}
                    </span>
                  </div>
                ))}
              </pre>
              <div className="ide-terminal">
                <p className="term-head">Terminal</p>
                <p><span className="tk-keyword">~/bugra-portfolio</span> $ npm run dev</p>
                <p>▲ Next.js 15 · Local: http://localhost:3000</p>
                <p className="term-ok">✓ Ready in 1.4s</p>
                {done && <p className="term-ok">✓ Compiled {file.path} in {compileMs}ms</p>}
              </div>
            </div>
          </div>
          <div className="ide-status">
            <span>⎇ main</span>
            <span>TypeScript React</span>
            <span>Ln {lines.length}, Col {(lines.at(-1)?.length ?? 0) + 1}</span>
          </div>
        </div>
      </div>

      {/* Layer 2: browser previewing the site */}
      <div className="screen-layer screen-browser">
        {menuBar}
        <div className="browser">
          <div className="browser-bar">
            <span className="lights"><i /><i /><i /></span>
            <span className="browser-url">localhost:3000</span>
          </div>
          <div className="mini-site">
            <div className="mini-nav">
              <b>{fullName}</b>
              <span>Work</span><span>About</span><span className="mini-cta">Contact</span>
            </div>
            <div className="mini-hero">
              <p className="mini-role">{fullName}<br /><span>{person.role}</span></p>
              <p className="mini-headline">{person.headline}</p>
              <p className="mini-intro">{person.intro}</p>
              <p className="mini-actions"><span className="mini-btn">View my work</span><span className="mini-btn mini-btn-line">Email me</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
