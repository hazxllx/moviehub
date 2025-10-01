'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { getTrending, getPopular } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        loadMovies();
      } else {
        setLoading(false);
      }
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

  const loadMovies = async () => {
    setLoading(true);
    try {
      const [trendData, popularData] = await Promise.all([getTrending(), getPopular()]);
      setTrending(trendData.results || []);
      setMovies(popularData.results || []);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back!
          </h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            </div>
          ) : (
            <>
              {trending.length > 0 && (
                <section className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">🔥 Trending This Week</h2>
                    <Link
                      href="/browse"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      See All →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {trending.slice(0, 10).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </section>
              )}

              {movies.length > 0 && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">⭐ Popular Movies</h2>
                    <Link
                      href="/browse"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Browse All →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.slice(0, 10).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Welcome to ModernCinema
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Discover and stream thousands of movies with a beautiful, modern interface
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/browse"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
          >
            Start Browsing
          </Link>
          <Link
            href="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}
