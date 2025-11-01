# Deployment Guide for Vercel

## Current Setup

The application uses:
- **Frontend**: Vite + React
- **Local Development**: `json-server` on port 3001
- **State Management**: Zustand (client-side)
- **API**: Currently only fetches initial data from API

## Deployment Options

### ✅ Option 1: Read-Only API (Current Implementation)

**What works:**
- The API route at `/api/tasks` serves initial task data from `db.json`
- All state changes are managed client-side with Zustand
- Changes persist in the browser session but not across page reloads

**Limitations:**
- Changes don't persist to the server
- Each user starts with the same initial data
- Data resets on page refresh (unless you add localStorage)

**This is fine for:** Demos, prototypes, or when persistence isn't required

---

### Option 2: Add Client-Side Persistence (localStorage)

Add localStorage to persist changes in the browser:

```typescript
// In taskStore.ts, add localStorage persistence
// This will persist data across page reloads per user
```

---

### Option 3: Use a Backend-as-a-Service

For production with real persistence, consider:

1. **Supabase** (PostgreSQL)
   - Free tier available
   - Easy integration with React

2. **Firebase** (Firestore)
   - Google's BaaS
   - Real-time updates

3. **MongoDB Atlas** (MongoDB)
   - Free tier available
   - Flexible schema

4. **JSONBin.io** (Simple JSON storage)
   - Free for low usage
   - Perfect for simple CRUD

---

### Option 4: Use Vercel KV or Edge Config

Vercel offers:
- **Vercel KV**: Redis-compatible storage
- **Vercel Edge Config**: Global key-value store

Both require Vercel Pro plan ($20/month)

---

## Deployment Steps

1. **Push to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Vite and configure it

3. **Environment Variables** (if using external API)
   - In Vercel dashboard → Settings → Environment Variables
   - Add `VITE_API_URL` if needed

4. **Deploy**
   - Vercel will automatically build and deploy
   - The `/api/tasks` route will work automatically

---

## Important Notes

- **File system writes don't work on Vercel** (read-only except `/tmp`)
- The current implementation is **read-only** for the API
- State management happens **client-side** with Zustand
- For real persistence, you'll need one of the options above

---

## Testing Locally

The setup works with:
- `npm run dev` - Uses json-server on port 3001
- The API route at `/api/tasks` will work when deployed to Vercel

For local testing of the API route, you can use:
```bash
npm run build
npm run preview
# Then navigate to http://localhost:4173/api/tasks
```

