import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Crown, Heart, Coins, BookOpen, Sparkles, Trophy } from "lucide-react";
import { motion } from "motion/react";

const monthlyTopAuthors = [
  { id: "a1", name: "하늘봄", books: 14, likes: 1840, growth: "+18%" },
  { id: "a2", name: "초록나무", books: 11, likes: 1560, growth: "+12%" },
  { id: "a3", name: "달빛", books: 9, likes: 1422, growth: "+9%" },
];

const weeklyTopAuthors = [
  { id: "wa1", name: "민들레", books: 7, likes: 426, growth: "+16%" },
  { id: "wa2", name: "별모래", books: 6, likes: 391, growth: "+13%" },
  { id: "wa3", name: "은하수", books: 5, likes: 358, growth: "+10%" },
];

const monthlyTopBooks = [
  {
    id: "b1",
    title: "별빛 요정의 모험",
    sales: 128000,
    likes: 512,
    author: "하늘봄",
    coverImageUrl: "https://picsum.photos/seed/rank-book-1/600/800",
  },
  {
    id: "b2",
    title: "숲속 친구들",
    sales: 98000,
    likes: 436,
    author: "초록나무",
    coverImageUrl: "https://picsum.photos/seed/rank-book-2/600/800",
  },
  {
    id: "b3",
    title: "바다 위의 별",
    sales: 82000,
    likes: 391,
    author: "달빛",
    coverImageUrl: "https://picsum.photos/seed/rank-book-3/600/800",
  },
];

const weeklyTopBooks = [
  {
    id: "wb1",
    title: "구름 위 우체국",
    sales: 42000,
    likes: 178,
    author: "민들레",
    coverImageUrl: "https://picsum.photos/seed/rank-weekly-book-1/600/800",
  },
  {
    id: "wb2",
    title: "달콤한 별나라 여행",
    sales: 36800,
    likes: 161,
    author: "별모래",
    coverImageUrl: "https://picsum.photos/seed/rank-weekly-book-2/600/800",
  },
  {
    id: "wb3",
    title: "반짝이는 숲의 약속",
    sales: 33100,
    likes: 149,
    author: "은하수",
    coverImageUrl: "https://picsum.photos/seed/rank-weekly-book-3/600/800",
  },
];

const rankBadge = ["🥇", "🥈", "🥉"];

const RankingsPage = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");
  const isMonthly = period === "monthly";
  const topAuthors = useMemo(() => (isMonthly ? monthlyTopAuthors : weeklyTopAuthors), [isMonthly]);
  const topBooks = useMemo(() => (isMonthly ? monthlyTopBooks : weeklyTopBooks), [isMonthly]);
  const maxAuthorLikes = Math.max(...topAuthors.map((a) => a.likes));

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 bg-[radial-gradient(circle_at_top_right,rgba(63,87,187,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(59,103,93,0.12),transparent_45%)]">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br from-primary/15 via-white to-secondary/10 p-7 md:p-10"
        >
          <div className="absolute -right-14 -top-14 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />

          <div className="relative space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 text-primary text-xs font-bold">
              <Sparkles size={14} />
              {isMonthly ? "MONTHLY HIGHLIGHTS" : "WEEKLY HIGHLIGHTS"}
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface">{isMonthly ? "이달의 랭킹" : "이번 주 랭킹"}</h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
              커뮤니티에서 가장 많은 사랑을 받은 작가와 작품을 모아봤어요.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center rounded-full p-1 bg-white/75 border border-white/70 shadow-sm">
                <button
                  type="button"
                  onClick={() => setPeriod("weekly")}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    !isMonthly ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  주간
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod("monthly")}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    isMonthly ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  월간
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 shadow-sm"
          >
            <h2 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2 mb-5">
              <Trophy size={20} className="text-primary" />
              {isMonthly ? "이달의 작가" : "이번 주 작가"}
            </h2>
            <div className="space-y-3">
              {topAuthors.map((author, i) => {
                const barWidth = (author.likes / maxAuthorLikes) * 100;
                return (
                  <div
                    key={author.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/15"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <p className="font-bold text-on-surface flex items-center gap-2">
                          <span>{rankBadge[i]}</span>
                          <span className="truncate">{author.name}</span>
                        </p>
                        <p className="text-xs text-on-surface-variant">작품 {author.books}작 · 누적 좋아요 {author.likes.toLocaleString()}</p>
                      </div>
                      <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full">{author.growth}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${barWidth}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 shadow-sm"
          >
            <h2 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2 mb-5">
              <BookOpen size={20} className="text-secondary" />
              {isMonthly ? "이달의 책" : "이번 주 책"}
            </h2>
            <div className="space-y-3">
              {topBooks.map((book, i) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="group p-3 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex items-center gap-3 hover:bg-surface-container transition-colors"
                >
                  <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0">
                    <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                      {rankBadge[i]} {book.title}
                    </p>
                    <p className="text-xs text-on-surface-variant">{book.author} 작가</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                      <span className="inline-flex items-center gap-1">
                        <Coins size={12} />
                        매출 {book.sales.toLocaleString()}원
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Heart size={12} />
                        좋아요 {book.likes}
                      </span>
                    </div>
                  </div>
                  <Crown size={16} className="text-primary/70 shrink-0" />
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default RankingsPage;
