import React from "react";
import { Link } from "react-router-dom";
import { Crown, Heart, Coins, BookOpen } from "lucide-react";

const topAuthors = [
  { id: "a1", name: "하늘봄", books: 14, likes: 1840 },
  { id: "a2", name: "초록나무", books: 11, likes: 1560 },
  { id: "a3", name: "달빛", books: 9, likes: 1422 },
];

const topBooks = [
  { id: "b1", title: "별빛 요정의 모험", sales: 128000, likes: 512, author: "하늘봄" },
  { id: "b2", title: "숲속 친구들", sales: 98000, likes: 436, author: "초록나무" },
  { id: "b3", title: "바다 위의 별", sales: 82000, likes: 391, author: "달빛" },
];

const RankingsPage = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface">
            이달의 랭킹
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg">
            커뮤니티에서 가장 사랑받은 작가와 작품을 한눈에 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <section className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20">
            <h2 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2 mb-5">
              <Crown size={20} className="text-primary" />
              이달의 작가
            </h2>
            <div className="space-y-3">
              {topAuthors.map((author, i) => (
                <div
                  key={author.id}
                  className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface">
                      {i + 1}. {author.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      작품 {author.books}개 · 누적 좋아요 {author.likes.toLocaleString()}
                    </p>
                  </div>
                  <Crown size={18} className="text-primary flex-shrink-0" />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20">
            <h2 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2 mb-5">
              <BookOpen size={20} className="text-secondary" />
              이달의 책
            </h2>
            <div className="space-y-3">
              {topBooks.map((book, i) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3 hover:bg-surface-container transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface truncate">
                      {i + 1}. {book.title}
                    </p>
                    <p className="text-xs text-on-surface-variant">{book.author} 작가</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-on-surface-variant">
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
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RankingsPage;
