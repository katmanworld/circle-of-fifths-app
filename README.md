# Circle of Fifths – Guitar & Songwriter Edition

A test-ready React/Vite beta for exploring major-key harmony, transposition, and practical guitar capo shapes.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`). Click every circle key, adjust Transpose from −12 to +12, then enable Capo Mode and try positions 0–12 or a recommended open-shape option.

## Build and preview

```bash
npm run build
npm run preview
```

## Get a shareable beta link

### Netlify Drop (fastest, no Git provider required)

1. Run `npm install && npm run build`.
2. Sign in at [Netlify Drop](https://app.netlify.com/drop).
3. Drag the generated `dist` folder onto the page.
4. Netlify immediately displays a public `https://…netlify.app` URL. Copy it to your tester.

### Vercel (Git-based continuous deployment)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In the [Vercel dashboard](https://vercel.com/new), import the repository.
3. Keep the detected Vite settings (`npm run build`, output directory `dist`) and click **Deploy**.
4. Copy the resulting `https://…vercel.app` link. New pushes will automatically update it.
