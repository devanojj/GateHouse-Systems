# GateHouse Systems website

Static marketing site for GateHouse Systems (IT support and systems administration).
Plain HTML, CSS and vanilla JavaScript, with no frameworks and no build step. Deploy by
pushing the files to GitHub Pages.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole site: hero, services, about, contact, footer |
| `styles.css` | All styling (mobile-first, navy/white) |
| `script.js` | Mobile nav, footer year, mailto contact form |
| `favicon.ico` | Favicon for search results and older browsers (16, 32, 48px) |
| `favicon-96x96.png` | 96px favicon; Google recommends at least 48px |
| `favicon.svg` | Vector favicon, preferred by modern browsers |
| `apple-touch-icon.png` | 180px home-screen icon for iOS |
| `icon-192.png`, `icon-512.png` | Android / PWA icons referenced by the manifest |
| `site.webmanifest` | Web app manifest (name, theme colour, icons) |
| `og-image.png` | 1200x630 preview image for social and chat link sharing |
| `CNAME` | Custom domain: `gatehouse.systems` |
| `.nojekyll` | Tells GitHub Pages to serve files as-is, skipping Jekyll |
| `robots.txt`, `sitemap.xml` | Search-engine crawl hints |
| `llms.txt` | Plain-text summary for AI assistants and answer engines |

To regenerate the icons after changing `favicon.svg`, note that they are rendered
from the same path data. Google only supports raster favicons (BMP, GIF, ICO, PNG,
JPEG, PPM, TIFF), so `favicon.ico` must stay in place for the icon to appear in
search results; the SVG alone is not enough.

The only external request is the Inter webfont from Google Fonts. Delete the two
`<link rel="preconnect">` tags and the `fonts.googleapis.com` stylesheet in
`index.html` to make the site fully self-contained. The CSS falls back to the
system UI font stack.

## Preview locally

Open `index.html` in a browser, or serve it so relative paths behave exactly as
they will in production:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy to GitHub Pages

### 1. Create the repository and push

```bash
git init -b main
git add .
git commit -m "Initial site"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Turn on Pages

In the repository: **Settings → Pages → Build and deployment**.
Set **Source** to `Deploy from a branch`, **Branch** to `main`, folder `/ (root)`,
then **Save**. The first build takes a minute or two.

If you name the repository `<your-username>.github.io`, the site is served at the
root of that domain; any other name serves it at
`https://<your-username>.github.io/<your-repo>/`. Either works with the custom
domain below.

### 3. Point the custom domain at Pages

`CNAME` already contains `gatehouse.systems`, so GitHub will pick the domain up
on deploy. At your DNS provider, for the apex domain `gatehouse.systems`, add
four `A` records pointing at GitHub's Pages IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

(Optionally add the matching `AAAA` records: `2606:50c0:8000::153`,
`2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)

Also add a `CNAME` record for `www` pointing to `<your-username>.github.io.` so
`www.gatehouse.systems` redirects to the apex.

Back in **Settings → Pages**, confirm the custom domain shows `gatehouse.systems`,
wait for the DNS check to pass, then tick **Enforce HTTPS**. DNS propagation and
certificate issuance can take up to 24 hours.

### Updating the site

Edit the files and push to `main`. Pages redeploys automatically.
