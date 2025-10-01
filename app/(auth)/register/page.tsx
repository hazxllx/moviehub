'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!username.trim()) {
        throw new Error('Username is required');
      }

      // Check if username already taken
      const { data: existingUsernames } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username);
      if (existingUsernames?.length) {
        throw new Error('Username already taken');
      }

      // Use example.com to avoid email validation errors
      const dummyEmail = `${username}@example.com`;

      // Create user in supabase auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email: dummyEmail,
        password,
      });
      if (signupError) throw signupError;

      // Insert username profile
      const userId = data.user?.id!;
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ user_id: userId, username });
      if (profileError) throw profileError;

      router.replace('/');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-8 text-indigo-700">Create Account</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block mb-1">Username</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-primary"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-primary"
              placeholder="********"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
