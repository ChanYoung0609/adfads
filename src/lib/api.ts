const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mongle.cloud';

export interface BookItem {
  bookId: string;
  title: string;
  coverImageUrl: string;
  authorName: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  number: number;
  size: number;
}

export async function fetchBooks(page: number, size: number): Promise<PageResponse<BookItem>> {
  const res = await fetch(`${API_BASE_URL}/api/books?page=${page}&size=${size}`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}
