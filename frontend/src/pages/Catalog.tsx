import { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { Book } from '../types/book'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'

export default function Catalog() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getBooks()
      .then(setBooks)
      .finally(() => setLoading(false))
  }, [])

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Books</h1>

      <div className="mb-6 max-w-md">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No books found for "{query}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
