# Contoura Labs — Digital Agency + Free Tools & Games

A static HTML/CSS/JS website for Contoura Labs with:
- **Homepage** — agency intro, services, portfolio, testimonials, contact form (EmailJS)
- **27 free in-browser tools** — PDF tools, image tools, generators, calculators, converters, text/dev tools, career tools
- **6 browser games** — Tic-Tac-Toe, Flappy Dot, Minesweeper, Trivia Quiz, Would You Rather, Typing Test

**Tech stack:** Plain HTML + Tailwind CSS (CDN) + vanilla JS. No build step. No backend. 100% static.

---

## Project Structure

```
contoura-labs/
├── index.html                  # Homepage (agency site)
├── README.md                   # This file
├── assets/
│   ├── css/
│   │   └── common.css          # Shared brand styles (colors, layout, components)
│   └── js/
│       └── common.js           # Shared JS (auto-injects navbar, theme toggle, toast)
├── tools/
│   ├── index.html              # Tools hub (categorized grid + search)
│   ├── pdf-to-word.html
│   ├── word-to-pdf.html
│   ├── merge-pdf.html
│   ├── split-pdf.html
│   ├── compress-pdf.html
│   ├── text-to-pdf.html
│   ├── background-remover.html
│   ├── photo-compressor.html
│   ├── qr-generator.html
│   ├── password-generator.html
│   ├── color-picker.html
│   ├── meta-generator.html
│   ├── hashtag-generator.html
│   ├── domain-generator.html
│   ├── random-number.html
│   ├── age-calculator.html
│   ├── bmi-calculator.html
│   ├── unit-converter.html
│   ├── currency-converter.html
│   ├── json-formatter.html
│   ├── base64.html
│   ├── text-rewriter.html
│   ├── grammar-corrector.html
│   ├── code-editor.html
│   ├── speed-test.html
│   ├── resume-builder.html
│   └── cover-letter-generator.html
└── games/
    ├── index.html              # Games hub
    ├── tic-tac-toe.html
    ├── flappy-bird.html
    ├── minesweeper.html
    ├── trivia-quiz.html
    ├── would-you-rather.html
    └── typing-test.html
```

---

## How to Deploy (Free Tier)

### Option A: Netlify (recommended — easiest)

1. Push this folder to a GitHub repo (e.g. `contoura-labs`)
2. Go to [netlify.com](https://app.netlify.com/start) → "Add new site" → "Import an existing project"
3. Connect your GitHub account → pick the `contoura-labs` repo
4. Netlify auto-detects static sites. Settings:
   - **Build command:** (leave blank)
   - **Publish directory:** `.` (root) — or whatever subfolder contains `index.html`
5. Click "Deploy site"

Your site will be live at `https://YOUR-SITE-NAME.netlify.app` within ~30 seconds. You can add a custom domain later in Site settings → Domain management.

### Option B: Vercel

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → import your repo
3. Framework preset: **Other** (static)
4. Root directory: leave default (the repo root)
5. Click "Deploy"

Live at `https://YOUR-PROJECT.vercel.app` within ~30 seconds.

### Option C: GitHub Pages

1. Push to GitHub
2. Repo → Settings → Pages
3. Source: "Deploy from a branch" → `main` / `(root)`
4. Save. Live at `https://YOUR-USERNAME.github.io/contoura-labs/` in ~1 min.

---

## Important Setup Notes

### Contact form (EmailJS)

The homepage contact form uses **EmailJS** (free tier: 200 emails/month). It is already wired to a public EmailJS service in `index.html`. To use your own account:

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Get your Service ID, Template ID, and Public Key
3. Edit `index.html`, find these lines near the bottom:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
     (function(){ emailjs.init("YOUR_PUBLIC_KEY"); })();
   </script>
   ```
   And in the contact form submit handler:
   ```js
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { from_name, from_email, message })
   ```
4. Replace with your own IDs

---

## Tools — Library Dependencies

Each tool only loads the CDN libraries it needs (so the homepage stays fast). Tools with external libraries:

| Tool | Library | Size |
|------|---------|------|
| pdf-to-word, compress-pdf | pdfjs-dist | ~2 MB (first load only) |
| word-to-pdf, merge, split, compress, text-to-pdf | pdf-lib | ~600 KB |
| word-to-pdf | mammoth.js | ~600 KB |
| split-pdf | JSZip | ~100 KB |
| background-remover | @imgly/background-removal | ~80 MB AI model (first use only, cached after) |
| photo-compressor | browser-image-compression | ~50 KB |
| qr-generator | qrcode | ~50 KB |
| resume-builder | html2pdf.js | ~600 KB |

All libraries are loaded from `cdn.jsdelivr.net` — free, fast, with global CDN.

---

## Tools — Skipped (Need Backend)

These tools from your original list were skipped because they truly need a server/database, and you said you're using free static hosting only:

- ~~URL shortener~~ — needs database to store short codes
- ~~Backlink checker~~ — needs server-side crawler + database
- ~~Keyword suggestion~~ — needs search volume API (paid)
- ~~To-do list app~~ — needs user accounts to sync across devices (localStorage-only version is too fragile)
- ~~Notes app with save~~ — same reason

**To add these later**, you'd need:
- A backend (e.g. Vercel Serverless Functions, Supabase, or Firebase)
- A database (Supabase, Firebase, or PlanetScale)
- Optional: API keys for keyword/backlink data (Ahrefs, SEMrush — both paid)

---

## Customization

### Brand colors

Edit `assets/css/common.css` — top of file:
```css
:root {
  --brand-orange: #FF6B35;
  --brand-red:    #E8384F;
  --brand-teal:   #00B8A9;
}
```
Also update the `tailwind.config` block in every HTML file's `<head>` (search/replace the hex values).

### Add a new tool

1. Copy any existing tool page (e.g. `tools/password-generator.html`)
2. Rename it (e.g. `tools/my-new-tool.html`)
3. Edit the `<title>`, `<h1>`, and tool-specific UI
4. Add a card to `tools/index.html`:
   ```html
   <a href="my-new-tool.html" class="tool-card-link" data-name="my new tool">
     <div class="tool-card-icon">...</div>
     <h3 class="tool-card-title">My New Tool</h3>
     <p class="tool-card-desc">What it does.</p>
   </a>
   ```
5. Push to GitHub — auto-deploys in ~30 sec

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge — last 2 years)
- Mobile responsive (tested layouts down to 360px width)
- Dark mode (auto-detects system preference, persists user choice in localStorage)

---

## Performance Notes

- Homepage: ~70 KB (mostly inline SVG + EmailJS)
- Each tool page: 5-15 KB HTML + shared cached assets
- Shared `common.css` (8 KB) and `common.js` (5 KB) are cached after first page load
- Tailwind CDN: ~3 MB on first load (cached for 1 year) — this is the trade-off for no build step. If you want a smaller bundle later, you can run Tailwind CLI to precompile, but it's not needed for free tier.

---

## License

© 2025 Contoura Labs. All rights reserved.
