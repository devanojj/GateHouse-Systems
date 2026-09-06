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
| `favicon.svg` | Favicon (matches the header logo mark) |
| `CNAME` | Custom domain: `gatehouse.systems` |
| `.nojekyll` | Tells GitHub Pages to serve files as-is, skipping Jekyll |
| `robots.txt`, `sitemap.xml` | Basic search-engine hints |

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

## Things you may want to change

- **Email address**: `info@gatehouse.systems` is used in three places: the contact
  section and footer links in `index.html`, and the `CONTACT_EMAIL` constant at the
  top of the contact-form block in `script.js`. Update all three if it changes.
- **Phone**: `+353 89 483 5439` appears in the contact section and the footer
  (both as visible text and in the `tel:` href).
- **Contact form**: it has no backend. On submit it validates the fields and opens
  the visitor's email client with the message pre-filled. To collect submissions
  server-side instead, point the `<form>` at a service such as Formspree and remove
  the submit handler from `script.js`.
