import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { isLoggedIn } from "../lib/auth";

const likedBooks = [
  { id: "l1", title: "달빛 아래 작은 모험", author: "하늘봄", likedAt: "오늘" },
  { id: "l2", title: "숲속 요정의 편지", author: "초록나무", likedAt: "어제" },
  { id: "l3", title: "바다를 건너는 별", author: "푸른노리", likedAt: "3일 전" },
  { id: "l4", title: "구름 마을의 비밀", author: "봄햇살", likedAt: "1주 전" },
  { id: "l5", title: "노을빛 기차 여행", author: "달빛", likedAt: "2주 전" },
];

const ReaderLikedBooksPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/reader")}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">좋아요 한 책</h1>
            <p className="text-on-surface-variant text-sm md:text-base">마음에 들어 저장한 책 목록이에요</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 overflow-hidden">
          <ul className="divide-y divide-outline-variant/20">
            {likedBooks.map((book) => (
              <li key={book.id} className="px-5 md:px-6 py-4 md:py-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-on-surface truncate">{book.title}</p>
                  <p className="text-xs md:text-sm text-on-surface-variant">{book.author} 작가</p>
                </div>
                <div className="flex items-center gap-2 text-red-500 flex-shrink-0">
                  <Heart size={16} className="fill-red-500" />
                  <span className="text-xs md:text-sm font-semibold">{book.likedAt}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReaderLikedBooksPage;
