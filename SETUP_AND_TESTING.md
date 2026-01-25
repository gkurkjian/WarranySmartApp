# Warranty Keeper - Setup & Testing Guide

## Overview
Warranty Keeper is a multi-user warranty tracking application built with Next.js, React-Bootstrap, and Supabase.

## Prerequisites
- Node.js 16+
- Supabase account (https://supabase.com)

---

## STEP 1: Database Setup

### 1. Go to Supabase Dashboard
1. Login to https://app.supabase.com
2. Open your project (or create a new one)
3. Go to **SQL Editor** in the left sidebar

### 2. Run the Database Schema
1. Open the file `database-schema.sql` in the project root
2. Copy all the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** button

This will create:
- `categories` table (user categories)
- `warranties` table (warranty records)
- Row Level Security (RLS) policies
- Indexes for performance
- Auto-update triggers

### 3. Verify Tables Created
Go to **Table Editor** in Supabase and confirm you see:
- `categories` table
- `warranties` table

---

## STEP 2: Environment Configuration

Your `.env.local` is already configured with:
```
NEXT_PUBLIC_SUPABASE_URL=https://vutvanaivfzksauxlxww.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_wNENDIunXuQByORvdivQCA_uimt44Oc
```

If you need to change it:
1. Go to Supabase Project Settings → API
2. Copy your **Project URL** and **anon/public key**
3. Update `.env.local`

---

## STEP 3: Install & Run

```bash
cd my-app
npm install
npm run dev
```

The app will run on **http://localhost:3000**

---

## TESTING GUIDE

### 1. Test Authentication
**Sign Up:**
1. Navigate to http://localhost:3000
2. Click "Sign Up" in the navbar
3. Enter email and password (e.g., `test@example.com` / `password123`)
4. Click "Sign Up"
5. ✅ You should be redirected to `/dashboard`

**Log Out:**
1. Click "Logout" button in navbar
2. ✅ You should be redirected to home page

**Log In:**
1. Click "Login" in navbar
2. Enter the same credentials
3. ✅ You should be redirected to `/dashboard`

---

### 2. Test Categories Management

**Add Categories:**
1. Go to **Categories** page (navbar)
2. Enter category name: "Electronics"
3. Click "Add"
4. ✅ Category should appear in the list
5. Repeat with: "Appliances", "Gadgets"

**Rename Category:**
1. Click "Rename" button on "Electronics"
2. Change to "Consumer Electronics"
3. Click "Save Changes"
4. ✅ Category name should update

**Delete Category:**
1. Click "Delete" on "Gadgets"
2. Confirm deletion
3. ✅ Category should disappear

---

### 3. Test Warranty Creation

**Add New Warranty:**
1. Go to **Dashboard**
2. Click "+ New Warranty" button
3. Fill in the form:
   - Product: "iPhone 15 Pro"
   - Platform: "Apple Store"
   - Category: "Consumer Electronics"
   - Purchase Date: "2024-01-15"
   - Expiry Date: "2026-01-15"
   - Notes: "AppleCare+ included"
4. Click "Create Warranty"
5. ✅ You should be redirected to dashboard
6. ✅ Warranty should appear in the "Active" tab

**Add Multiple Warranties:**
Add these test warranties:

| Product | Platform | Category | Purchase | Expires | Expected Status |
|---------|----------|----------|----------|---------|----------------|
| MacBook Pro | Apple Store | Consumer Electronics | 2023-06-01 | 2024-06-01 | Expired |
| Samsung Fridge | Best Buy | Appliances | 2024-10-01 | 2026-10-01 | Active |
| Dyson Vacuum | Amazon | Appliances | 2024-12-01 | 2025-03-01 | < 3 months |
| Sony TV | Costco | Consumer Electronics | 2024-06-01 | 2025-09-01 | < 6 months |

---

### 4. Test Dashboard Features

**Search Functionality:**
1. Type "iPhone" in search box
2. ✅ Only iPhone warranty should show
3. Clear search
4. ✅ All warranties should show again

**Category Filter:**
1. Select "Appliances" from dropdown
2. ✅ Only Samsung Fridge and Dyson Vacuum should show
3. Select "All Categories"
4. ✅ All warranties should show

**Active/Expired Tabs:**
1. Click "Active" tab
2. ✅ Should show warranties that haven't expired
3. Click "Expired" tab
4. ✅ Should show expired warranties (MacBook Pro)

**Status Badges:**
- 🔴 Red "Expired" = Past expiry date
- 🔴 Red "< 3 months" = Less than 90 days left
- 🟡 Yellow "< 6 months" = Less than 180 days left
- 🟢 Green "Active" = More than 6 months left

---

### 5. Test Edit Warranty

1. Click "Edit" button on any warranty
2. Change the product name to "iPhone 15 Pro Max"
3. Update expiry date
4. Click "Save Changes"
5. ✅ You should return to dashboard
6. ✅ Changes should be visible

---

### 6. Test Delete Warranty

1. Click "Delete" button on a warranty card
2. Confirm deletion
3. ✅ Warranty should disappear immediately

**Or from Edit Page:**
1. Click "Edit" on a warranty
2. Click the red "Delete" button
3. Confirm deletion
4. ✅ Should return to dashboard
5. ✅ Warranty should be gone

---

### 7. Test LocalStorage Migration (Optional)

**Prepare Test Data:**
1. Open browser console (F12)
2. Run this JavaScript:
```javascript
localStorage.setItem('warranty_items_v1', JSON.stringify([
  {
    id: 'test1',
    product: 'Test Product 1',
    platform: 'Test Store',
    category: 'Test',
    purchaseDate: '2024-01-01',
    expiresAt: '2025-01-01',
    notes: 'Imported from localStorage'
  },
  {
    id: 'test2',
    product: 'Test Product 2',
    platform: 'Another Store',
    category: 'Test',
    purchaseDate: '2024-02-01',
    expiresAt: '2025-02-01',
    notes: 'Also imported'
  }
]));
```

**Test Import:**
1. Refresh the dashboard page
2. You should see a blue card: "Import from LocalStorage"
3. Click "Check for LocalStorage Data"
4. ✅ Should show "Found 2 warranties"
5. Click "Import to Database"
6. ✅ Should show success message
7. ✅ Two test warranties should appear in your list

**Clear LocalStorage:**
1. Click "Clear LocalStorage" button
2. Confirm
3. ✅ LocalStorage should be cleared

---

### 8. Test Multi-User Isolation (RLS)

**Create Second User:**
1. Logout
2. Sign up with different email: `user2@example.com`
3. ✅ Dashboard should be empty
4. Add a warranty for user2

**Verify Isolation:**
1. Logout from user2
2. Login as first user
3. ✅ You should NOT see user2's warranties
4. ✅ You should only see your own warranties

This confirms Row Level Security is working!

---

### 9. Test Edge Cases

**Empty States:**
- ✅ Dashboard with no warranties shows "Add Your First Warranty" button
- ✅ Categories page with no categories shows appropriate message
- ✅ Search with no results shows empty state

**Category Deletion with Warranties:**
1. Create a warranty with a category
2. Try to delete that category
3. ✅ Warning should appear: "This category has 1 warranty"
4. Confirm deletion
5. ✅ Category should be deleted
6. ✅ Warranty should still exist but show "Uncategorized"

**Form Validation:**
- Try submitting warranty form with empty required fields
- ✅ Browser should prevent submission
- ✅ Required fields should show validation errors

---

## TROUBLESHOOTING

### Issue: "Failed to load data"
- Check `.env.local` has correct Supabase URL and key
- Verify database schema was run successfully
- Check browser console for detailed errors

### Issue: "User not authenticated"
- Clear browser cookies/localStorage
- Try signing up again
- Check Supabase Authentication is enabled in project settings

### Issue: RLS Policy Error
- Go to Supabase → Table Editor
- Click on `warranties` or `categories` table
- Verify RLS is enabled (toggle should be ON)
- Re-run the database schema SQL

### Issue: Warranties not showing
- Check browser console for errors
- Verify you're logged in (check Network tab for auth headers)
- Check Supabase Table Editor to see if data exists

---

## PRODUCTION DEPLOYMENT

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
vercel --prod
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Port: 3000

---

## FEATURE CHECKLIST

- ✅ **Authentication**: Sign up, Login, Logout
- ✅ **Multi-user**: Row Level Security (RLS)
- ✅ **Dashboard**: List warranties with stats
- ✅ **Search**: Filter by product/platform name
- ✅ **Category Filter**: Filter by category
- ✅ **Tabs**: Active/Expired warranties
- ✅ **Status Badges**: Expired, < 3mo, < 6mo, Active
- ✅ **CRUD Warranties**: Create, Read, Update, Delete
- ✅ **CRUD Categories**: Create, Rename, Delete
- ✅ **LocalStorage Migration**: Import old data
- ✅ **Responsive Design**: Bootstrap mobile-friendly
- ✅ **Empty States**: User-friendly messages

---

## FILE STRUCTURE

```
my-app/
├── pages/
│   ├── index.js              # Landing page
│   ├── login.js              # Login page
│   ├── signup.js             # Signup page
│   ├── dashboard.js          # Main dashboard (STEP 5)
│   ├── categories.js         # Category management (STEP 7)
│   ├── warranties/
│   │   ├── new.js            # Create warranty (STEP 6)
│   │   └── [id].js           # Edit warranty (STEP 6)
│   └── _app.js               # App wrapper
├── components/
│   ├── CostumeNavBar.js      # Navigation bar
│   ├── WarrantyList.js       # Warranty cards display
│   ├── LocalStorageMigration.js  # Import tool (STEP 8)
│   └── Footer.js             # Footer component
├── lib/
│   ├── supabaseClient.js     # Supabase config
│   ├── useSession.js         # Auth hook
│   └── requireAuth.js        # Protected route HOC
├── .env.local                # Environment variables
└── database-schema.sql       # Database setup (STEP 4)
```

---

## NEXT STEPS (Future Enhancements)

1. **Receipt Attachments**: Use Supabase Storage for file uploads
2. **Email Reminders**: Notify users before warranty expires
3. **Export**: Download warranties as CSV/PDF
4. **Dark Mode**: Theme toggle
5. **Mobile App**: React Native version
6. **Warranty Templates**: Pre-filled common warranties
7. **Sharing**: Share warranty details with family

---

## SUPPORT

For issues or questions:
- Check the troubleshooting section above
- Review Supabase docs: https://supabase.com/docs
- Review Next.js docs: https://nextjs.org/docs

---

**Built with ❤️ using Next.js, React-Bootstrap, and Supabase**
