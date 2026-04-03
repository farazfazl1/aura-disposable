# Deploy to Vercel — Step by Step

## Step 1: Log in to Vercel

In your terminal (in this project folder), run:

```bash
npx vercel login
```

- A browser window will open (or you’ll get a link).
- Sign in with **GitHub**, **GitLab**, **Bitbucket**, or **Email**.
- When it says “Success! You are now logged in,” you’re done.

---

## Step 2: Deploy (preview)

From the project root:

```bash
npx vercel
```

- First time: it will ask to link the project. Choose your **scope** (account/team) and confirm.
- It will detect **Next.js** and deploy. You’ll get a **preview URL** (e.g. `https://aura-disposable-xxx.vercel.app`).

---

## Step 3: Add environment variables

Your app uses Supabase. Add the same vars in Vercel so the deployed app works.

**Option A — Vercel Dashboard**

1. Open [vercel.com](https://vercel.com) → your project → **Settings** → **Environment Variables**.
2. Add:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`  
     **Value:** `https://mncupoetckqbndsnxehw.supabase.co`
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
     **Value:** *(paste from your local `.env`)*
3. Choose **Production** (and **Preview** if you want). Save.

**Option B — CLI**

```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste the URL when prompted.

npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste the anon key when prompted.
```

After adding or changing env vars, redeploy (Step 4).

---

## Step 4: Deploy to production

When the preview looks good:

```bash
npx vercel --prod
```

This deploys to your **production** domain (e.g. `your-project.vercel.app`).

---

## Quick reference

| Step | Command |
|------|--------|
| 1. Login | `npx vercel login` |
| 2. Preview deploy | `npx vercel` |
| 3. Add env vars | Dashboard or `npx vercel env add ...` |
| 4. Production deploy | `npx vercel --prod` |
