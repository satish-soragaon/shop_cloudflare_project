import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { api } from '../services/api'
import type { Book } from '../types/book'
import BookCard from '../components/BookCard'

export default function Home() {
  const [featured, setFeatured] = useState<Book[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.getBooks().then((books) => setFeatured(books.slice(0, 4)))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Your Next Favorite Book</h1>
          <p className="text-blue-100 text-lg mb-8">Browse and purchase books from our collection.</p>
          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Browse Books
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Books</h2>
        {featured.length === 0 ? (
          <p className="text-gray-500">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
