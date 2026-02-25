# WebZítra — Klientský projekt

## Tech stack
- HTML5, CSS3, vanilla JavaScript (žádný framework, žádný WordPress)
- Hosting: Netlify CDN — SSL, automatické deploys z GitHub po push do `main`

## Standardy
- Responzivní (mobile-first), breakpointy: 1024px / 768px / 480px
- Lighthouse 90+ (performance, accessibility, SEO, best practices)
- Kontaktní formulář: Netlify Forms (`action="/" method="POST" data-netlify="true"`)
- SEO základ: meta tagy, Open Graph, JSON-LD, sitemap.xml, robots.txt
- Cookie banner (GDPR) — s možností odmítnout
- Favicon: SVG + ICO fallback
- Obrázky: WebP, `loading="lazy"`
- Dark/light mode: `prefers-color-scheme` + toggle
- Čistý, komentovaný kód — editovatelný přes AI editor

## Struktura
```
index.html / css/style.css / js/main.js / img/ / favicon.svg / sitemap.xml / robots.txt
```
