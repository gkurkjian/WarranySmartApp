# 🚀 QUICKSTART - Get Your App Running in 5 Minutes

## Step 1: Setup Database (2 minutes)

1. **Login to Supabase**: https://app.supabase.com
2. **Open your project** (the one connected to your .env.local)
3. **Go to SQL Editor** (left sidebar)
4. **Copy & paste** the entire content of `database-schema.sql`
5. **Click "Run"**
6. ✅ Done! Tables created with RLS enabled.

---

## Step 2: Start the App (1 minute)

```bash
cd my-app
npm install   # If not already installed
npm run dev
```

✅ App running at **http://localhost:3000**

---

## Step 3: Quick Test (2 minutes)

### Create Account & Add Warranty

1. **Sign Up**: http://localhost:3000/signup
   - Email: `demo@test.com`
   - Password: `password123`

2. **Add Category**:
   - Click "Categories" in navbar
   - Add: "Electronics"
   - Add: "Appliances"

3. **Add Warranty**:
   - Click "Dashboard" → "+ New Warranty"
   - Product: "iPhone 15"
   - Platform: "Apple Store"
   - Category: "Electronics"
   - Purchase: Today's date
   - Expires: 1 year from today
   - Click "Create Warranty"

4. **See It Work**:
   - ✅ Warranty appears in dashboard
   - ✅ Shows "Active" badge (green)
   - ✅ Try search: type "iPhone"
   - ✅ Try filter: select "Electronics"
   - ✅ Click Edit → change details → Save
   - ✅ Click Delete → confirm

---

## What's Working Now?

✅ User authentication (signup/login/logout)
✅ Multi-user database (each user sees only their data)
✅ Full warranty CRUD (Create, Read, Update, Delete)
✅ Category management
✅ Dashboard with search & filters
✅ Active/Expired tabs
✅ Status badges (Expired, <3mo, <6mo, Active)
✅ LocalStorage migration tool
✅ Responsive design (mobile-friendly)

---

## File Structure Reference

```
Key files you might want to customize:

📄 database-schema.sql          ← Database tables & RLS
📄 .env.local                   ← Supabase credentials
📁 pages/dashboard.js           ← Main warranty list
📁 pages/warranties/new.js      ← Create warranty form
📁 pages/warranties/[id].js     ← Edit warranty form
📁 pages/categories.js          ← Category management
📁 components/WarrantyList.js   ← Warranty card display
📁 components/CostumeNavBar.js  ← Navigation bar
```

---

## Common Issues & Fixes

**"Failed to load data"**
→ Run `database-schema.sql` in Supabase SQL Editor

**"Not authenticated"**
→ Sign up at `/signup` first

**Warranties not showing**
→ Check you're logged in & check browser console

**Wrong Supabase project**
→ Update `.env.local` with correct URL & key from Supabase project settings

---

## Read Full Testing Guide

For comprehensive testing instructions, see: **SETUP_AND_TESTING.md**

---

**You're all set! 🎉**
