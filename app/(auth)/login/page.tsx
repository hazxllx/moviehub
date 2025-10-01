'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace('/');
    });
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!username.trim()) throw new Error('Username is required');

      // Lookup user_id by username
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('username', username)
        .single();
      if (profileError || !profile) throw new Error('Username not found');

      // Fetch user's email - based on dummy email username@local
      const dummyEmail = `${username}@local`;

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: dummyEmail,
        password,
      });
      if (loginError) throw loginError;

      router.replace('/');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-8 text-indigo-700">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1">Username</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full input-primary"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input-primary"
              placeholder="********"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
