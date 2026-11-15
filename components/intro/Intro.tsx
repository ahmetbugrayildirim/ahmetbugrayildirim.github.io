'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import Screen from './Screen';
import { highlights, person } from '@/data/site';

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

/** Sum offsetLeft/offsetTop up to `root` (ignores CSS transforms on purpose). */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/**
 * Scroll-driven intro:
 *  1. Bugra codes behind his laptop (we see the lid).
 *  2. Scrolling turns the laptop around: the screen shows a live editor.
 *  3. The editor switches to a browser preview and the camera zooms into it.
 *  4. The real hero fades in, and the page carries on.
 */
export default function Intro() {
  const trackRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(query.matches);
    const onChange = () => setReduceMotion(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    const laptop = laptopRef.current;
    const screen = screenRef.current;
    if (!track || !scene || !laptop || !screen) return;

    if (reduceMotion) {
      laptop.removeAttribute('style');
      scene.removeAttribute('style');
      return;
    }

    // Measured with the laptop at rest (no rotation, base size).
    let geo = { w0: 0, ox: 0, oy: 0, cx: 0, cy: 0, vw: 0, vh: 0, scale: 1 };
    let frame = 0;

    const resetLaptop = () => {
      laptop.style.transform = 'none';
      laptop.style.left = '';
      laptop.style.top = '';
      laptop.style.bottom = '';
      laptop.style.removeProperty('--lid-w');
    };

    const measure = () => {
      resetLaptop();
      const lap = offsetWithin(laptop, scene);
      const scr = offsetWithin(screen, scene);
      const vw = scene.clientWidth;
      const vh = scene.clientHeight;
      geo = {
        w0: laptop.offsetWidth,
        ox: scr.x - lap.x + screen.offsetWidth / 2, // screen centre inside the laptop
        oy: scr.y - lap.y + screen.offsetHeight / 2,
        cx: scr.x + screen.offsetWidth / 2,         // screen centre in the scene
        cy: scr.y + screen.offsetHeight / 2,
        vw,
        vh,
        scale: Math.max(vw / screen.offsetWidth, vh / screen.offsetHeight) * 1.02,
      };
      laptop.style.transformOrigin = `${geo.ox}px ${geo.oy}px`;
    };

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const distance = track.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / distance);

      const turn = ease(clamp((p - 0.04) / 0.26));
      const zoom = ease(clamp((p - 0.3) / 0.58));
      const browser = clamp((p - 0.56) / 0.08);
      const hero = clamp((p - 0.86) / 0.08);

      // The zoom resizes the laptop for real (instead of scaling a bitmap),
      // so the screen stays sharp at every size.
      const k = 1 + (geo.scale - 1) * zoom;
      const cx = geo.cx + (geo.vw / 2 - geo.cx) * zoom;
      const cy = geo.cy + (geo.vh / 2 - geo.cy) * zoom;
      laptop.style.setProperty('--lid-w', `${geo.w0 * k}px`);
      laptop.style.left = `${cx - geo.ox * k}px`;
      laptop.style.top = `${cy - geo.oy * k}px`;
      laptop.style.bottom = 'auto';
      laptop.style.transformOrigin = `${geo.ox * k}px ${geo.oy * k}px`;
      laptop.style.transform = turn < 1 ? `rotateY(${180 * (1 - turn)}deg)` : 'none';

      scene.style.setProperty('--turn', turn.toFixed(4));
      scene.style.setProperty('--browser', browser.toFixed(4));
      scene.style.setProperty('--zoom', zoom.toFixed(4));
      scene.style.setProperty('--hero', hero.toFixed(4));
      scene.classList.toggle('is-hero', hero > 0.6);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  const skipIntro = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackTop = window.scrollY + track.getBoundingClientRect().top;
    window.scrollTo({
      top: trackTop + track.offsetHeight - window.innerHeight,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section ref={trackRef} className="intro" aria-label="Introduction">
      <div ref={sceneRef} className="scene">
        <div className="room" aria-hidden="true">
          <div className="wall-glow" />
          <div className="shelf">
            <span className="book b1" /><span className="book b2" /><span className="book b3" />
            <span className="shelf-plant" />
          </div>
        </div>

        <div className="avatar-wrap">
          <Avatar />
        </div>

        <div className="desk" aria-hidden="true">
          <div className="mug"><span className="steam s1" /><span className="steam s2" /></div>
          <div className="plant"><span /><span /><span /></div>
        </div>

        <div ref={laptopRef} className="laptop">
          <div className="lid">
            <div className="lid-face lid-front">
              <div ref={screenRef} className="screen">
                <Screen reduceMotion={reduceMotion} />
              </div>
              <span className="notch" />
            </div>
            <div className="lid-face lid-back">
              <span className="sticker">BY</span>
            </div>
          </div>
          <div className="deck"><div className="keyboard" /><div className="trackpad" /></div>
        </div>

        <button type="button" className="scroll-cue" onClick={skipIntro}>
          Scroll to see what I’m building
          <span aria-hidden="true" className="scroll-cue-arrow">↓</span>
        </button>

        {/* Final state: the real hero */}
        <div className="hero-layer">
          <div className="wrap hero-layer-inner">
            <h1 className="hero-name">
              {person.firstNames} {person.lastName}
              <span className="hero-role">{person.role}</span>
            </h1>
            <p className="hero-headline">{person.headline}</p>
            <p className="hero-intro">{person.intro}</p>
            <div className="hero-actions">
              <Link className="btn" href="/#work">View my work</Link>
              <a className="btn btn-line" href={`mailto:${person.email}`}>Email me</a>
            </div>
            <dl className="highlights">
              {highlights.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
