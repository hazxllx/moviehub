'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (user && pathname === '/') {
    return (
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">🎬 ModernCinema</h1>
          <button
            onClick={handleSignOut}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition"
          >
            Sign Out
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          🎬 ModernCinema
        </Link>
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link href="/browse" className="hover:text-indigo-200 transition">
                Browse
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-indigo-200 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
