// API Route to verify database setup
// Access at: http://localhost:3000/api/verify-db

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({
      success: false,
      error: 'Missing Supabase environment variables',
      check: 'Make sure .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY',
    });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const results = {
    env_vars: '✅ Environment variables present',
    categories_table: '❌ Not checked',
    warranties_table: '❌ Not checked',
    auth_enabled: '❌ Not checked',
  };

  try {
    // Test categories table
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('count', { count: 'exact', head: true });

    if (categoriesError) {
      results.categories_table = `❌ Error: ${categoriesError.message}`;

      if (categoriesError.message.includes('does not exist') || categoriesError.message.includes('not found')) {
        results.categories_table += '\n\n🔧 FIX: You need to run database-schema.sql in Supabase SQL Editor';
      }
    } else {
      results.categories_table = '✅ Categories table exists';
    }

    // Test warranties table
    const { data: warrantiesData, error: warrantiesError } = await supabase
      .from('warranties')
      .select('count', { count: 'exact', head: true });

    if (warrantiesError) {
      results.warranties_table = `❌ Error: ${warrantiesError.message}`;

      if (warrantiesError.message.includes('does not exist') || warrantiesError.message.includes('not found')) {
        results.warranties_table += '\n\n🔧 FIX: You need to run database-schema.sql in Supabase SQL Editor';
      }
    } else {
      results.warranties_table = '✅ Warranties table exists';
    }

    // Test auth
    const { data: session, error: authError } = await supabase.auth.getSession();
    if (authError) {
      results.auth_enabled = `⚠️ Auth check failed: ${authError.message}`;
    } else {
      results.auth_enabled = '✅ Authentication is configured';
    }

    // Determine overall success
    const allPassed =
      results.categories_table.includes('✅') &&
      results.warranties_table.includes('✅') &&
      results.auth_enabled.includes('✅');

    return res.status(allPassed ? 200 : 500).json({
      success: allPassed,
      message: allPassed
        ? '✅ Database is properly set up! You can use the app now.'
        : '❌ Database setup incomplete. See details below.',
      details: results,
      next_steps: allPassed
        ? ['Go to /signup to create an account', 'Then go to /dashboard to add warranties']
        : [
            '1. Open Supabase Dashboard (https://app.supabase.com)',
            '2. Go to SQL Editor',
            '3. Copy and paste the entire database-schema.sql file',
            '4. Click Run',
            '5. Refresh this page to verify',
          ],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
}
