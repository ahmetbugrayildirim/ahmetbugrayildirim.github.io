# Bugra Yildirim, portfolio

Built with **Next.js (App Router) and TypeScript**.

```bash
npm install
npm run dev      # local preview at http://localhost:3000
npm run build    # static site in the out/ folder
```

## Where things live

| What | File |
| --- | --- |
| All text: intro, projects, skills, links | `data/site.ts` |
| Colours, fonts, spacing | `app/globals.css` (variables at the top) |
| Home page | `app/page.tsx` |
| Project pages (`/projects/<id>`) | `app/projects/[id]/page.tsx` |
| Header and footer | `components/` |
| Animated intro (desk scene, laptop, live screen) | `components/intro/` and `app/intro.css` |
| Photos and screenshots | `assets/` |

**Add a project:** copy one object in `projects` in `data/site.ts` and give it a
unique `id`. Its page is created automatically. To add a screenshot, put the
image in `assets/`, import it at the top of `data/site.ts` and set `image`.

## Hosting

`npm run build` produces a fully static site in `out/`. Deploy that folder to
any host, or connect the repository to Vercel, which detects Next.js
automatically.

## The intro animation

- `components/intro/Avatar.tsx`: the illustrated portrait (SVG). Blinking,
  glancing, typing and breathing are CSS animations in `app/intro.css`.
- `components/intro/Screen.tsx`: what the laptop shows. The code that gets
  typed is in the `files` list at the top; edit it freely.
- `components/intro/Intro.tsx`: reads the scroll position and drives the
  laptop turn, the zoom and the hand-off to the real hero. The timings are
  the `turn`, `zoom`, `browser` and `hero` lines in `update()`.
- Visitors who turn on "reduce motion" in their system settings get a still
  scene followed by the normal hero.
