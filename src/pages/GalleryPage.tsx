import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { fetchBooks, type BookItem } from "../lib/api";

const PAGE_SIZE = 4;

const GalleryPage = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchBooks(page, PAGE_SIZE);
      setBooks((prev) => [...prev, ...data.content]);
      setHasMore(!data.last);
      setPage((prev) => prev + 1);
    } catch {
      // API 실패 시 더 이상 로드하지 않음
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadMore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold leading-tight tracking-tight text-on-surface">
            무한한 세계, <br />
            <span className="text-primary italic">한 페이지씩</span> 완성돼요
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg max-w-xl">
            우리 커뮤니티가 만든 AI 생성 이야기를 만나보세요. 깊은 우주부터 마법의 숲까지 준비되어 있어요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {books.map((book, i) => (
            <motion.div
              key={book.bookId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % PAGE_SIZE) * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/book/${book.bookId}`} className="flex flex-row sm:flex-col gap-4 sm:gap-0">
                <div className="relative w-1/3 sm:w-full aspect-[3/4] rounded-2xl overflow-hidden book-shadow sm:mb-4 group-hover:-translate-y-2 transition-transform duration-500 flex-shrink-0">
                  <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-500">
                      <BookOpen size={32} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center sm:justify-start flex-grow min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold group-hover:text-primary transition-colors truncate sm:whitespace-normal">{book.title}</h3>
                  <p className="text-on-surface-variant text-xs sm:text-sm font-medium">{book.authorName} 작가</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 무한스크롤 감지용 */}
        <div ref={observerRef} className="h-10 flex items-center justify-center">
          {loading && (
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
