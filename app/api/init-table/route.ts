import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export async function GET() {
  const sql = `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS profiles (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
      username text UNIQUE NOT NULL,
      created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
    );
  `;
  try {
    // Run SQL command
    const { error } = await supabase.rpc('execute_sql', { sql_text: sql });
    // Supabase currently doesn't support direct raw query here in SDK,
    // so you must create a `execute_sql` stored procedure or run manually once.
    // Alternatively, you can run SQL from your DB console on deploy.
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
