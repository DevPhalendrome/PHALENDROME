# PHALENDROME SOLUTIONS — Solutions in Symmetry

![PHALENDROME SOLUTIONS Hero Banner](assets/hero-banner.png)  
*(Replace with your actual symmetric hero image — think clean gradients, mirrored elements, calm blues with a touch of vibrant coral energy)*

**PHALENDROME SOLUTIONS** is more than an IT company — it's a promise of balance, reliability, and forward-backward consistency in everything we build. Just like a perfect palindrome reads the same forwards and backwards, our digital solutions deliver unwavering quality from day one through years of growth.

This boilerplate gives you a clean, modern, responsive **static website** ready to showcase your services to small and medium businesses in Johannesburg and beyond. It's built for speed, simplicity, accessibility, and subtle delight — mirroring our brand philosophy.

## ✨ Why this template feels like PHALENDROME

- **Symmetric beauty** — balanced layouts, mirrored hover effects, and a logo that nods to perfect reflection
- **Calm yet dynamic** — primary calm blue (#0A2540 / #0066CC tones) meets energetic coral accents (#FF6B6B → #FF8C69 gradient) for trust + action
- **Business-first** — focused on conversion: clear CTAs, trust signals, service highlights, and frictionless contact
- **Developer-friendly** — minimal JS, no heavy frameworks, easy to extend or host anywhere (Netlify, Vercel, GitHub Pages)
- **Inclusive by default** — respects `prefers-reduced-motion`, high contrast options, semantic HTML, ARIA labels

## What's Included

- `index.html` — Hero + Services teaser + Why Choose Us + CTA
- `about.html` — Our story, palindrome philosophy, team vibe
- `services.html` — Detailed breakdown: Website Design, Digital Platforms, IT Consulting + Support
- `contact.html` — Smart form (mailto fallback + optional Formspree/Netlify/Getform integration)
- `css/style.css` — Mobile-first responsive design with CSS variables, dark/light theme toggle
- `js/main.js` — Theme switcher, smooth scroll, form handling, subtle micro-animations
- `assets/` — logo.svg (symmetric wordmark suggestion), icons, placeholder images
- `previews/` — (generate your own) folder for screenshots

## Quick Start in 3 Steps

1. **Clone & Open**  
   `git clone <your-repo-url>`  
   Double-click `index.html` or use `npx live-server` / `npx serve`

2. **Personalize Immediately**  
   - Replace `[Your Email Address]` / `[Your Phone Number]` with real contact details  
   - Update `www.phalendromesolutions.co.za` links  
   - Swap placeholder images in `assets/` with your real brand photos / portfolio shots  
   - Insert your Google Analytics GA4 ID (`G-XXXXXXX`) in the `<head>` of each HTML file

3. **Make the Contact Form Live** (choose one)  
   - **Easiest**: Formspree  
     Sign up → get endpoint → paste into `contact.html` → `<form id="contactForm" data-endpoint="https://formspree.io/f/your-id">`  
   - Alternatives: Netlify Forms, Getform, Formcarry, or your own backend  
   → On success: friendly "Message received — we'll mirror your energy right back! 🚀" message

Deploy in seconds: Drag to **Netlify**, **Vercel**, or **GitHub Pages** — free & automatic HTTPS.

## Customization Ideas to Make It Uniquely Yours

- **Brand Glow-up**  
  Add real client testimonials with photos  
  Embed a short Loom video: "See how we brought symmetry to a local retailer"  
  Use subtle SVG animations on scroll (e.g., logo elements mirroring on load)

- **Visual Storytelling**  
  Hero: mirrored gradient background + tagline "Same quality forwards and backwards"  
  Services: card flip or mirror-effect hover  
  Footer: small palindrome Easter egg (e.g., "A man a plan a canal — reliable digital solutions")

- **Extra Polish**  
  - Add a floating WhatsApp chat bubble (common in SA)  
  - Implement basic portfolio gallery (lightbox.js or native `<dialog>`)  
  - Blog section stub for future content marketing  
  - Cookie consent banner (if targeting EU visitors)

- **Performance & SEO Boost**  
  Compress images → aim < 100 KB each  
  Add Open Graph / Twitter cards meta tags  
  Use descriptive alt text everywhere  
  Submit sitemap to Google Search Console after launch

## Screenshots & Previews (Generate Your Own!)

Want beautiful previews for your repo / socials?

```bash
# Install once
npm install puppeteer --save-dev

# Serve locally
npx live-server

# Then run screenshot script (edit URLs inside scripts/screenshot.js if needed)
node scripts/screenshot.js
```
