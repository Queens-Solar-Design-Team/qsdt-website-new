# Queen's Solar Design Team Website

The website for the Queen's University Solar Design Team (QSDT): who we are, the Queen's Solar Education Centre (QSEC), our team, projects, solar education resources and a solar dashboard.

Built with Next.js 16, React 19 and Tailwind CSS, with an optional MongoDB-backed admin editor for team and project content.

---

## Getting started

**Requirements:** Node.js 24 LTS (anything ≥ 20.9 works) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

The public pages work without any setup. The admin editor and database-backed content need the environment variables below.

### Environment variables

Create `.env.local` in the project root. Never commit it; `.env*` is git-ignored. Ask a team lead for the values.

| Variable | Needed for | Description |
| --- | --- | --- |
| `MONGODB_URI` | Admin editor, saved content | MongoDB Atlas connection string. Without it the site falls back to the built-in data in `data/`. |
| `ADMIN_PATH` | Admin editor | The private address of the admin editor, e.g. `editor-x7Kq2mP9` → `/editor-x7Kq2mP9`. At least 8 letters, digits, `-` or `_`. See [Admin editor](#admin-editor). |
| `ADMIN_PASSWORD` | Admin editor | Shared password for the admin editor. |
| `AUTH_SECRET` | Admin editor | Long random string used to sign the admin login cookie. Changing it logs everyone out. |
| `NEXT_PUBLIC_SITE_URL` | Optional | The site's public address, e.g. `https://qsdt.ca`, used in the sitemap, robots.txt and structured data. Set it once the team has its own domain. On Vercel it otherwise defaults to the project's production domain. |
| `NEXT_PUBLIC_API_URL` | Optional | Only if the API is served from a different origin. Leave unset normally. |

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (includes type checking) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript check only (`tsc --noEmit`) |

**Before pushing:** `npm run lint` and `npm run build` should both finish with 0 errors. Warnings are allowed.

---

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router), `output: 'standalone'` |
| UI | React 19, Tailwind CSS 3.4 |
| Fonts | Fraunces (headings), Jost (nav, buttons, labels), Inter (body), all via `next/font/google` |
| Charts | Recharts 2 (dashboard) |
| Animation | GSAP 3 (About page text reveal) |
| Database | MongoDB Atlas (free M0 tier, 512 MB) via the official `mongodb` driver |
| Language | TypeScript 5.9, strict mode |

When upgrading, bump `next` and `eslint-config-next` together to the same exact version. Do major upgrades (Tailwind 4, Recharts 3, ESLint 10, TypeScript 7) 

---

## Project structure

```
app/
  page.tsx                Home page
  about/ qsec/ team/ projects/ education/ dashboard/   Public pages
  projects/[slug]/        Single project page
  admin/                  Password-protected content editor (served at /<ADMIN_PATH>, never /admin)
  api/                    API routes (see below)
  layout.tsx              Fonts, site-wide metadata and JSON-LD structured data
  sitemap.ts              Generates /sitemap.xml
  robots.txt/route.ts     Generates /robots.txt
  opengraph-image.png     Link-preview image (QSDT logo, 1200×630)
  globals.css             Tailwind + small custom animations
components/
  Navbar.tsx              Top navigation (transparent "overlay" mode on the home hero)
  Footer.tsx              Footer (includes the sponsor strip)
  SponsorBanner.tsx       Scrolling sponsor logos
  ContentEditor.tsx       Admin editing UI
data/
  team.ts                 Built-in team list
  projects.ts             Built-in project list
lib/
  site.ts                 Site name, URL, contact, socials and page list (shared by footer, sitemap, SEO)
  mongo.ts                Shared MongoDB client
  content.ts              Database access and input validation
  passwords.ts            Admin login cookie helpers
proxy.ts                  Serves the admin editor at its private address and hides /admin
public/images/            All images (team photos in team_photos/, project photos in project-images/)
```

### Pages

| Route | Content |
| --- | --- |
| `/` | Full-screen hero, "Who we are", "The Solar Education Centre", facts band |
| `/about` | Team history and achievements |
| `/qsec` | The Queen's Solar Education Centre and its systems |
| `/team` | Team members grouped by project, plus a "Join the team" section |
| `/projects`, `/projects/[slug]` | Project list and individual project pages |
| `/education` | Solar energy topics and resources |
| `/dashboard` | Solar dashboard (**currently demo data**, labelled on the page) |
| `/<ADMIN_PATH>` | Content editor for team and projects (see [Admin editor](#admin-editor)) |
| `/sitemap.xml`, `/robots.txt` | Generated for search engines (see [SEO](#seo)) |

---

## Updating content

### Team members

- Edit `data/team.ts` to add, remove or reorder people. Put photos in `public/images/team_photos/` and reference them as `/images/team_photos/First_Last.jpg`.
- Or use the [admin editor](#admin-editor) → Team. Admin edits override the built-in entry with the same `id`; new admin entries get ids from 1001.
- **Grouping is automatic, based on the `role` text.** The rules are in `GROUPS` at the top of `app/team/page.tsx`: a role containing "captain" goes under Leadership, "coordinator" under Coordinators, and so on. Unmatched roles go under "Other Roles". To add a new project group, add a rule to `GROUPS` and its title to `DISPLAY_ORDER`.
- Roles ending in "Project Manager" are shown as just "Project Manager", because the group heading already names the project.
- Missing or broken photos fall back to the person's initials.

### Projects

Edit `data/projects.ts`, or use the [admin editor](#admin-editor) → Projects. `status` is one of `in_progress`, `completed` or `planned`. A project can have up to 20 image links.

### Home page photos

The three home-page photos are set in the `IMAGES` constant at the top of `app/page.tsx`:

| Key | Where it appears | Current file |
| --- | --- | --- |
| `hero` | Full-screen photo behind the title | `/images/qsec.jpg` |
| `whoWeAre` | Beside "Who we are" (tall 4:5 frame) | `/images/rooftop-solar.jpg` |
| `qsec` | Beside "The Solar Education Centre" | `/images/project-images/OGWS-1.jpeg` |

To change one, add the image to `public/images/`, update its `src`, and write an `alt` that describes the new photo. `next/image` resizes and compresses automatically. On phones the hero is cropped to a narrow column; the `object-[30%_45%]` class on the hero image controls which part stays in view.

### Join link

The **Apply to join** button at the bottom of `/team` links to the team Linktree: `https://linktr.ee/queenssolardesign`. The home page **Join** button scrolls to that section (`/team#join`).

### Footer, navigation and sponsors

- **Footer** (`components/Footer.tsx`): `pages` holds the page links, and `socials` holds Instagram and LinkedIn. Add more as `{ href, label }`.
- **Navigation** (`components/Navbar.tsx`): the `links` list. The current page is highlighted automatically.
- **Sponsors** (`components/SponsorBanner.tsx`): the `defaultSponsors` list. Logos go in `public/images/`; add a `url` to make a logo clickable.

### Dashboard

`/dashboard` shows hard-coded demo numbers from `app/api/solar/route.ts`, with a "Demo data" badge under the title. When the API is connected to real QSEC readings, remove the badge in `app/dashboard/page.tsx`.

---

## Design system

The look is calm and photo-led: big photography, restrained colour, and wide-tracked uppercase headings.

**Colours** (`tailwind.config.js`):

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#1b1d1a` | Header, footer, dark sections, body text |
| `gold` | `#f2b705` | Accent: buttons, active nav link, hover states |
| `stone` | `#f4f2ee` | Light alternate section background |

The hero titles use a warmer gold, `#f8d26a`. The older `solar-*` green tokens are still used by the inner pages that haven't been restyled yet (About, QSEC body, Projects, Education, Dashboard).

**Type:** Fraunces (`font-heading`) for titles, section headings and large numbers; Jost (`font-display`) for navigation, buttons and small uppercase labels; Inter for body text.

**Hero treatment** (home and QSEC pages): the photo, then a neutral dark gradient, then warm amber shading at the left and right edges, then gold text. Keep the two heroes in step if you change one.

**Header and footer** are the same on every page: a black header (transparent only over the home hero) and a black footer with a white sponsor strip above it.

---

## Admin editor

The editor lives at a private address set by the `ADMIN_PATH` environment variable, so it isn't at a guessable URL like `/admin`. Ask a team lead for the address, or check `ADMIN_PATH` in Vercel → Project → Settings → Environment Variables. Log in with `ADMIN_PASSWORD`. The session lasts 8 hours.

| | `/admin` | `/<ADMIN_PATH>` |
| --- | --- | --- |
| `ADMIN_PATH` set | 404 | The editor |
| `ADMIN_PATH` not set, `npm run dev` | The editor | 404 |
| `ADMIN_PATH` not set, production | 404 | n/a (editor unreachable) |

- **Changing the address:** set a new `ADMIN_PATH` in Vercel (Production, and Preview if you use it there) and redeploy. Environment variable changes only take effect on the next deployment. Don't use the name of a real page (`team`, `projects`, ...); those are ignored.
- The address is a speed bump, not the security. The password is still what protects the editor and every admin API route. Never put the real address in the repo, robots.txt or the sitemap.
- The editor page sends `noindex` (a meta tag and an `X-Robots-Tag` header), so search engines won't list it even if someone links to it. It also has no link preview, so a shared link doesn't show the QSDT card.
- The code is in `app/admin/`; the address mapping is in `proxy.ts`.


- Switch between **Projects** and **Team**, pick an item, edit, then **Save**. A live preview of the public page reloads beside the form.
- **History:** every save keeps a version (the newest 20 per item). Click a timestamp to load it into the form, then Save to restore it.
- **Delete** removes the database copy. If a built-in item in `data/` has the same `id`, that one reappears; to remove someone for good, also delete them from `data/team.ts`.
- A storage meter shows usage against the 512 MB free-tier database limit.
- Images are links, not uploads. Text fields are capped at 5,000 characters.

If the database is unreachable, the public site keeps working from the built-in data.

---

## SEO

- **`/sitemap.xml`** (`app/sitemap.ts`) lists every public page plus one `/projects/<id>` page per project, including projects added in the admin editor. It refreshes at most once an hour. New public pages need adding to `PAGES` in `lib/site.ts`.
- **`/robots.txt`** (`app/robots.txt/route.ts`) starts with a comment naming the site ("robots.txt for Queen's Solar Design Team (QSDT)"), allows everything except the private API routes and points to the sitemap. `/api/team`, `/api/projects` and `/api/solar` stay crawlable on purpose: the Team, Projects and Dashboard pages load their content from them in the browser, and Google needs to fetch them to see that content. On Vercel preview (branch) deployments it blocks all crawling, so only production gets indexed.
- **Link previews:** `app/opengraph-image.png` is the QSDT logo centred on a white 1200×630 card, used when the site is shared on LinkedIn, Instagram, Slack, etc. To change it, replace the file (keep 1200×630) and its alt text in `app/opengraph-image.alt.txt`. Every page's title, description and preview say "Queen's Solar Design Team (QSDT)".
- **Structured data:** `app/layout.tsx` adds JSON-LD to every page describing the team as an `Organization` named "Queen's Solar Design Team" (also known as QSDT, Queen's University Solar Design Team, and its former name Queen's Solar Vehicle Team) with logo, founding year, contact, Kingston address, Queen's University as parent, Instagram and LinkedIn) plus a `WebSite`. The values come from `lib/site.ts`. Check it after a deploy with Google's [Rich Results Test](https://search.google.com/test/rich-results).
- **Headings:** each page has one `<h1>`, then `<h2>` sections, then `<h3>` and so on, without skipping a level. Keep it that way: pick the heading level for its place in the outline and style it with classes, not by picking a smaller tag.
- **Readability:** keep paragraphs short (roughly under 50 words). Use separate `<p>` elements rather than `<br><br>` inside one paragraph.
- After the first production deploy, submit `https://<domain>/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

---

## API routes

| Route | Method | Auth | Purpose |
| --- | --- | --- | --- |
| `/api/team` | GET | Public | Team list (database merged over built-in data) |
| `/api/projects` | GET | Public | Project list (same merge) |
| `/api/solar` | GET | Public | Dashboard data (demo values for now) |
| `/api/login` | GET / POST | Public | Check login status / log in |
| `/api/content/[kind]` | GET / POST / DELETE | Admin | Version history / save / delete for `team` or `projects` |
| `/api/storage` | GET | Admin | Database storage usage |

---

## Troubleshooting

- **A change doesn't show up:** hard-refresh the browser (Ctrl+Shift+R). If it still doesn't change, restart `npm run dev`.
- **`npm install` warns about a blocked `unrs-resolver` install script:** that's expected and safe to ignore; lint works without it.
- **`next-env.d.ts` keeps showing as modified:** Next.js regenerates it during `dev` and `build`. Don't edit it by hand.

---

## Contact

Queen's University Solar Design Team, Kingston, Ontario
director.qsdt@engsoc.queensu.ca · [Instagram](https://www.instagram.com/queenssolardesignteam/) · [LinkedIn](https://www.linkedin.com/company/queen's-solar-design-team/) · [Join the team](https://linktr.ee/queenssolardesign)
