'use client';

import { useState, useEffect } from 'react';
import { searchMovies, getTrending, getPopular } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { Movie } from '@/types/movie';

export default function BrowsePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      loadInitial();
    }
  }, [searchTerm]);

  // Load default trending and popular movies
  const loadInitial = async () => {
    setLoading(true);
    try {
      const [trendData, popularData] = await Promise.all([getTrending(), getPopular()]);
      setTrending(trendData.results || []);
      setMovies(popularData.results || []);
    } catch (error) {
      setMovies([]);
      setTrending([]);
    } finally {
      setLoading(false);
    }
  };

  // Search movies by query
  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (!query.trim()) {
      loadInitial();
      return;
    }
    setLoading(true);
    try {
      const data = await searchMovies(query);
      setMovies(data.results || []);
    } catch (error) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Discover Movies
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Show trending only when not searching */}
      {!loading && !searchTerm && trending.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🔥 Trending This Week
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trending.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {searchTerm ? 'Search Results' : 'Popular Movies'}
        </h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No movies found.</p>
        )}
      </section>
    </div>
  );
}
