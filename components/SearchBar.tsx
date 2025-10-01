'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="flex-1 px-6 py-3 rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none text-gray-800 text-lg"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition shadow-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
}
