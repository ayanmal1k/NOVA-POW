# 🌟 Nova Pow — Web3 Community & Growth Specialist

An award-winning, high-performance portfolio and proof-of-work showcase built for **Nova**, a premier Web3 Community Manager, Growth Strategist & Marketing Specialist.

---

## ⚡ Tech Stack & Architecture

- **Framework:** [Next.js 16 (App Router + Turbopack)](https://nextjs.org/)
- **Core:** React 19 + TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Smooth Inertia Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **Animations & Micro-Interactions:** [Framer Motion](https://www.framer.com/motion/) + Spring Physics
- **Icons & UI:** Lucide React + Custom SVG Path Geometry
- **Fonts:**
  - **Astronomus** (`font-display`) — Custom futuristic display typography for headers and badges.
  - **Poppins** (`font-sans`) — High-readability geometric sans-serif for body descriptions.

---

## 🚀 Key Features

1. **Awwwards-Tier Hero Section:**
   - Dynamic responsive background swapping (`hero-bg.png` on desktop with character artwork, `hero-bg-mobile.png` on mobile).
   - Golden brush typography with ambient halo effects and custom chamfered sci-fi polygon CTA button.
2. **Interactive Glass Navbar:**
   - Seamless transparent overlay on top viewport.
   - Transitions on scroll into dark glass with **live HTML5 Canvas floating gold particle system**.
3. **Services Showcase:**
   - 5 bespoke futuristic chamfered cards with corner slash marks and 3D metallic icons.
   - Organized in a 3-in-top-row / 2-centered-in-bottom-row full-width grid.
4. **Proof of Work (Featured Projects):**
   - 7 featured Web3 projects with full-width square artwork banners, project title, and role badge (*Community Manager, Marketer, Co-Owner, Moderator*).
   - Golden halo glow and hover elevation transitions.
5. **Direct Connect Action Hub:**
   - Dual connect buttons (*Telegram & X*) + Full-width double-span **JOIN NOVA POW** channel CTA.
6. **Footer:**
   - Hero brand logo, smooth navigation anchors, animated Telegram & X badges, and developer credit link.
7. **Comprehensive Search & Answer Engine Optimization (SEO / GEO / AEO):**
   - Fully optimized for Google, Bing, Perplexity, Claude, ChatGPT Search, and Google SGE.
   - Embedded JSON-LD Knowledge Graph schema (`Person`, `ProfessionalService`, `WebSite`).
   - Dynamic `sitemap.xml` and `robots.txt` generation.

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Tailwind v4 theme tokens & base styles
│   ├── layout.tsx           # Root layout with fonts, Lenis, and JSON-LD schema
│   ├── page.tsx             # Full page layout assembling all sections
│   ├── robots.ts            # Dynamic robots.txt
│   └── sitemap.ts           # Dynamic sitemap.xml
├── components/
│   ├── navbar.tsx           # Glass sticky navbar with animated canvas particles
│   ├── hero-section.tsx     # Full-width hero banner with responsive backgrounds
│   ├── services-section.tsx # 3+2 sci-fi chamfered services grid
│   ├── projects-section.tsx # Proof of work portfolio showcase
│   ├── contact-section.tsx  # Direct social connection hub & channel CTA
│   ├── footer.tsx           # Full-width footer with animated socials
│   └── smooth-scroll.tsx    # Lenis smooth inertia scroll provider
├── public/
│   ├── astronomus/          # Custom Astronomus display font
│   ├── projects/            # Project artwork and logos
│   ├── services icons/      # 3D embossed service icons
│   ├── hero-bg.png          # Desktop hero background
│   ├── hero-bg-mobile.png   # Mobile hero background
│   ├── hero-text.png        # Golden brush NOVA logo
│   ├── contact-text.png     # "Real People Real Growth" graphic
│   └── icon.jpeg            # Brand avatar & favicon
└── package.json
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Validation
```bash
npm run build
npm run start
```

---

## 🔗 Official Links

- **Telegram:** [@Web_3_nova](https://t.me/Web_3_nova)
- **X (Twitter):** [@Bitzygirl01](https://x.com/Bitzygirl01)
- **POW Channel:** [t.me/NOVA_pow](https://t.me/NOVA_pow)
- **Developer:** [AMEX (@AyanMalikkkk)](https://t.me/AyanMalikkkk)
