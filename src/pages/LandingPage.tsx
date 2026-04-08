import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Palette, BookOpen, Flame, Clock3 } from "lucide-react";
import { fetchBooks, type BookItem } from "../lib/api";

const LandingPage = () => {
  const [books, setBooks] = useState<BookItem[]>([]);

  useEffect(() => {
    fetchBooks(0, 8)
      .then((data) => setBooks(data.content))
      .catch(() => {});
  }, []);

  const latestBooks = useMemo(() => books.slice(0, 6), [books]);
  // 인기 지표가 API 응답에 없어 임시로 최신 목록 역순을 사용
  const popularBooks = useMemo(() => [...books].reverse().slice(0, 6), [books]);

  return (
    <div className="min-h-screen pt-24 magical-gradient relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none storybook-bg" />

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest font-label">
            <Sparkles size={16} />
            AI 기반 스토리텔링
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-extrabold leading-tight md:leading-tight max-w-4xl mx-auto text-on-surface tracking-tight">
            AI로 당신만의 <br />
            <span className="text-primary italic">마법 같은</span> 동화책을 <br />
            만들어보세요
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-body font-medium">
            아이디어만 있다면 누구나 몇 번의 클릭으로 일러스트와 이야기를 완성할 수 있어요.
          </p>

          <div className="pt-8">
            <Link
              to="/start"
              className="inline-flex px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full text-lg font-bold shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95"
            >
              지금 시작하기
            </Link>
          </div>
        </motion.div>

        {books.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-16 md:mt-24 w-full max-w-6xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-3xl bg-white/75 backdrop-blur-sm border border-white/60 p-4 md:p-5 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm md:text-base">
                  <Clock3 size={18} />
                  최신순
                </div>
                <div className="space-y-3">
                  {latestBooks.map((book) => (
                    <Link
                      key={`latest-${book.bookId}`}
                      to={`/book/${book.bookId}`}
                      className="group flex items-center gap-3 rounded-2xl p-2 md:p-3 hover:bg-white/90 transition-colors"
                    >
                      <div className="w-16 md:w-20 aspect-[3/4] rounded-xl overflow-hidden shadow-md flex-shrink-0">
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <h3 className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">{book.title}</h3>
                        <p className="text-xs md:text-sm text-on-surface-variant">{book.authorName} 작가</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white/75 backdrop-blur-sm border border-white/60 p-4 md:p-5 space-y-4">
                <div className="flex items-center gap-2 text-secondary font-bold text-sm md:text-base">
                  <Flame size={18} />
                  인기순
                </div>
                <div className="space-y-3">
                  {popularBooks.map((book) => (
                    <Link
                      key={`popular-${book.bookId}`}
                      to={`/book/${book.bookId}`}
                      className="group flex items-center gap-3 rounded-2xl p-2 md:p-3 hover:bg-white/90 transition-colors"
                    >
                      <div className="w-16 md:w-20 aspect-[3/4] rounded-xl overflow-hidden shadow-md flex-shrink-0">
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <h3 className="font-bold text-on-surface truncate group-hover:text-secondary transition-colors">{book.title}</h3>
                        <p className="text-xs md:text-sm text-on-surface-variant">{book.authorName} 작가</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <section className="bg-surface-container-lowest py-20 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 rounded-3xl glass-card border border-white/20">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Sparkles size={32} />
              </div>
              <h4 className="text-2xl font-headline font-bold text-on-surface">AI 스토리텔링</h4>
              <p className="text-on-surface-variant font-body">간단한 키워드만으로도 몰입감 있는 이야기를 생성할 수 있어요.</p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl glass-card border border-white/20">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <Palette size={32} />
              </div>
              <h4 className="text-2xl font-headline font-bold text-on-surface">마법 일러스트</h4>
              <p className="text-on-surface-variant font-body">수채화부터 만화풍까지, AI가 이야기 장면을 생생하게 그려줘요.</p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl glass-card border border-white/20">
              <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                <BookOpen size={32} />
              </div>
              <h4 className="text-2xl font-headline font-bold text-on-surface">출간까지 한 번에</h4>
              <p className="text-on-surface-variant font-body">완성한 작품을 저장하고 실제 책처럼 감상해보세요.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
