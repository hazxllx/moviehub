# ModernCinema - Movie Streaming Platform

A beautiful, modern movie streaming platform built with Next.js 14, Supabase, and TMDB API.

## Features

- 🎬 Browse and search thousands of movies
- 🔐 User authentication with Supabase
- 🎥 Stream movies directly in the browser
- 📱 Fully responsive design
- 🎨 Modern, aesthetic UI with Tailwind CSS
- ⚡ Fast and optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- TMDB API key (already included)

### Installation

1. Extract the zip file
2. Navigate to the project directory:
   ```bash
   cd moviehub
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Update the `.env.local` file with your Supabase credentials:
   - Get your Supabase URL and Anon Key from your Supabase project settings
   - Replace `YOUR_SUPABASE_ANON_KEY_HERE` with your actual key

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables from `.env.local` to Vercel
4. Deploy!

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_TMDB_API_KEY` - Your TMDB API key (included)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `DATABASE_URL` - PostgreSQL connection string (included)
- `DIRECT_URL` - Direct PostgreSQL connection (included)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** Supabase Auth
- **Database:** PostgreSQL (Supabase)
- **Styling:** Tailwind CSS
- **API:** TMDB (The Movie Database)
- **Deployment:** Vercel

## Project Structure

```
moviehub/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (protected)/     # Protected routes
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
├── lib/                 # Utility functions
├── types/               # TypeScript types
└── middleware.ts        # Route protection
```

## License

MIT License - feel free to use for your projects!

## Support

For issues or questions, please check the documentation or create an issue.
