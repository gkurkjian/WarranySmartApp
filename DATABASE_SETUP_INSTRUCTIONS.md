# 🔧 DATABASE SETUP INSTRUCTIONS

## ⚠️ IMPORTANT: You MUST complete this before using the app!

The error "Could not find the table 'public.categories' in the schema cache" means the database tables haven't been created yet.

---

## 📋 STEP-BY-STEP SETUP

### STEP 1: Open Supabase Dashboard

1. Go to **https://app.supabase.com**
2. **Login** to your account
3. **Select your project** (the one with URL: vutvanaivfzksauxlxww.supabase.co)

---

### STEP 2: Open SQL Editor

1. Look at the **left sidebar**
2. Click on **"SQL Editor"** icon (looks like </> or a document)
3. You should see a SQL query editor window

---

### STEP 3: Run the Database Schema

1. **Open** the file `database-schema.sql` from your project folder
   - Location: `C:\Users\georg\OneDrive\Desktop\WarrantySmartApp\my-app\database-schema.sql`

2. **Copy ALL the SQL code** from that file (Ctrl+A, Ctrl+C)

3. **Paste** it into the Supabase SQL Editor

4. Click the **"Run"** button (or press Ctrl+Enter)

5. **Wait** for it to complete (you should see success messages)

---

### STEP 4: Verify Tables Were Created

1. In Supabase, click **"Table Editor"** in the left sidebar
2. You should see **TWO new tables**:
   - ✅ **categories**
   - ✅ **warranties**

If you see these tables, you're done! ✅

---

### STEP 5: Test the App

```bash
cd my-app
npm run dev
```

Now try:
1. Go to http://localhost:3000
2. Login or Sign up
3. Go to Categories page
4. Try adding a category
5. ✅ It should work now!

---

## 🔍 VERIFICATION CHECKLIST

Before testing the app, verify in Supabase:

- [ ] SQL query ran without errors
- [ ] `categories` table exists in Table Editor
- [ ] `warranties` table exists in Table Editor
- [ ] Both tables have RLS enabled (shield icon should be visible)
- [ ] Auth is enabled (Settings → Authentication → Email enabled)

---

## ❌ TROUBLESHOOTING

### Issue: "Error running SQL"
**Solution:** Make sure you:
1. Copied the ENTIRE `database-schema.sql` file
2. Selected the correct project in Supabase
3. Have permission to create tables (you're the project owner)

### Issue: Tables exist but still getting "not found" error
**Solution:**
1. Go to Supabase → Settings → API
2. Copy the **Project URL** and **anon key**
3. Update your `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
4. Restart the dev server: `npm run dev`

### Issue: "Cannot insert into table"
**Solution:** RLS policies might not be set correctly
1. Go to Supabase → Table Editor
2. Click on `categories` table
3. Click on "Policies" tab
4. You should see 4 policies (SELECT, INSERT, UPDATE, DELETE)
5. If not, re-run the SQL schema

### Issue: Still not working
**Solution:** Drop and recreate tables
1. Go to SQL Editor
2. Run:
```sql
DROP TABLE IF EXISTS warranties CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
```
3. Then re-run the full `database-schema.sql`

---

## 📸 VISUAL GUIDE

### What SQL Editor looks like:
```
┌─────────────────────────────────┐
│  Supabase Project               │
├─────────────────────────────────┤
│  [Home]                         │
│  [Table Editor] ← Check here    │
│  [SQL Editor] ← Run SQL here    │
│  [Database]                     │
│  [Authentication]               │
│  [Storage]                      │
│  [Settings]                     │
└─────────────────────────────────┘
```

### What Table Editor should show after setup:
```
Tables:
✅ categories (id, user_id, name, created_at)
✅ warranties (id, user_id, product, platform, ...)
```

---

## 🚨 CRITICAL: Do This FIRST Before Using the App

**YOU CANNOT USE THE APP UNTIL YOU RUN THE SQL SCHEMA!**

The app will fail with errors like:
- "Could not find table 'public.categories'"
- "Could not find table 'public.warranties'"
- "Failed to load data"

**After running the SQL, the app will work perfectly!**

---

## ✅ SUCCESS CONFIRMATION

You'll know it worked when:
1. ✅ No errors in Supabase SQL Editor
2. ✅ Two tables visible in Table Editor
3. ✅ You can add categories in the app
4. ✅ You can add warranties in the app
5. ✅ Dashboard loads without errors

---

## 📞 Need More Help?

If you're still stuck:
1. Take a screenshot of the error in Supabase SQL Editor
2. Check the browser console (F12) for detailed errors
3. Verify you're using the correct Supabase project
4. Make sure your `.env.local` has the right credentials

---

**Once you complete this setup, you'll never need to do it again!**
**The tables will persist in your Supabase database.**
