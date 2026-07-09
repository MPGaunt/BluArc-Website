# BluArc, LLC Website

A simple Next.js app developer website for BluArc, LLC with app listings, support pages, App Store privacy policy URLs, terms of service pages, and a hidden JSON-backed admin portal.

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The admin portal is hidden at:

```text
http://localhost:3000/admin-portal
```

Set your admin password in `.env.local`:

```bash
ADMIN_PASSWORD=your-password-here
ADMIN_SESSION_SECRET=use-a-long-random-secret
```

If you do not set `ADMIN_PASSWORD`, the local fallback password is `change-me-now`.

## Public Pages

- Home: `/`
- Apps list: `/apps`
- App details: `/apps/puzzlefy`, `/apps/quietword`
- Legal index: `/privacy`
- App privacy policies: `/privacy/puzzlefy`, `/privacy/quietword`
- Terms index: `/terms`
- App terms of service: `/terms/puzzlefy`, `/terms/quietword`
- Support: `/support`
- Hidden admin: `/admin-portal`

## Change Company Name, Logo, and Contact Info

Use `/admin-portal`, or edit `data/site-content.json` directly.

Company fields live under:

```json
"company": {
  "name": "BluArc, LLC",
  "email": "support@bluarcllc.com",
  "logoUrl": ""
}
```

`logoUrl` can be a full image URL or a local file path from `public`, such as `/logo.png`.

## Add or Edit Apps

Use `/admin-portal` to add, edit, or delete apps. Each app has:

- app name and URL slug
- icon URL
- short and long descriptions
- platform badges
- App Store links
- support URL
- editable privacy policy sections
- editable terms of service sections

The app slug controls the public URLs. For example, a slug of `puzzlefy` creates:

```text
/apps/puzzlefy
/privacy/puzzlefy
/terms/puzzlefy
```

## Edit Privacy Policies

Each app contains its own privacy policy fields in `data/site-content.json`. The admin portal exposes all required sections:

- effective date
- information collected
- how information is used
- third-party services and SDKs
- ads and analytics disclosure
- children's privacy
- contact email
- updates to policy

The default template is written for apps that collect no personal data. Customize it per app before submitting App Store privacy URLs.

## Edit Terms of Service

Each app also contains its own terms of service fields in `data/site-content.json`. The admin portal exposes:

- effective date
- acceptance of terms
- permitted use
- purchases and billing
- user content
- disclaimers
- limitation of liability
- termination
- changes to terms
- contact email

Terms pages are available at `/terms/app-slug`.

## Deployment to Vercel

1. Push this `bluarc-website` folder to a GitHub repository.
2. In Vercel, create a new project and select the repository.
3. Use the default Next.js settings.
4. Add environment variables:
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
5. Deploy.

Important: this project stores content in `data/site-content.json`. That is perfect for local maintenance and Git-based updates. On Vercel serverless deployments, admin edits to local JSON may not persist across deployments or serverless instances. For production admin editing directly on Vercel, replace the JSON file with a persistent store such as Vercel KV, Supabase, Turso, or another small database.

## Useful Commands

```bash
npm run dev
npm run lint
npm run build
```
