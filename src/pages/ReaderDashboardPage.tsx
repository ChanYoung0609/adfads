import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  BookOpen, Clock, TrendingUp, Heart, ArrowLeft,
  CheckCircle, BookMarked, Calendar, Target
} from "lucide-react";
import { isLoggedIn } from "../lib/auth";

// TODO: 실제 API 연동
const mockReaderStats = {
  totalRead: 47,
  completedBooks: 32,
  inProgressBooks: 5,
  totalReadingTime: 1260,
  readingStreak: 7,
  likedBooks: 28,
  avgReadingPerDay: 35,
  monthlyGoal: 10,
  monthlyCompleted: 7,
};

const mockReadingList = [
  { id: "1", title: "달빛 요정의 모험", author: "하늘별", progress: 75, lastRead: "2시간 전", totalPages: 12 },
  { id: "2", title: "숲속 친구들", author: "초록나무", progress: 40, lastRead: "어제", totalPages: 8 },
  { id: "3", title: "구름 위의 성", author: "하늘별", progress: 20, lastRead: "3일 전", totalPages: 16 },
  { id: "4", title: "마법의 정원", author: "꽃잎", progress: 90, lastRead: "5일 전", totalPages: 10 },
];

const mockCompletedRecent = [
  { id: "5", title: "바다 위의 별", author: "파도소리", completedDate: "2일 전", rating: 5 },
  { id: "6", title: "무지개 다리", author: "색동이", completedDate: "1주 전", rating: 4 },
  { id: "7", title: "별빛 기차", author: "달빛", completedDate: "2주 전", rating: 5 },
];

const ReaderDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");
  }, [navigate]);

  const goalPercent = Math.round((mockReaderStats.monthlyCompleted / mockReaderStats.monthlyGoal) * 100);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface">독자로써의 활동기록</h1>
            <p className="text-on-surface-variant text-sm md:text-base">읽기 기록과 진행률을 확인하세요.</p>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "읽은 책", value: mockReaderStats.totalRead, icon: BookOpen, color: "text-primary" },
            { label: "완독", value: mockReaderStats.completedBooks, icon: CheckCircle, color: "text-secondary" },
            { label: "연속 읽기", value: `${mockReaderStats.readingStreak}일`, icon: TrendingUp, color: "text-tertiary" },
            { label: "총 읽기 시간", value: `${Math.round(mockReaderStats.totalReadingTime / 60)}시간`, icon: Clock, color: "text-primary" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20"
            >
              <stat.icon size={20} className={`${stat.color} mb-2`} />
              <p className="text-2xl font-headline font-bold text-on-surface">{stat.value}</p>
              <p className="text-xs text-on-surface-variant">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 읽고 있는 책 */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20">
            <h2 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
              <BookMarked size={20} className="text-primary" />
              읽고 있는 책
            </h2>
            <div className="space-y-4">
              {mockReadingList.map((book) => (
                <Link
                  key={book.id}
                  to={`/read/${book.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">{book.title}</p>
                    <p className="text-xs text-on-surface-variant">{book.author} 작가 · {book.lastRead}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-24 h-2.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-primary w-12 text-right">{book.progress}%</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-4">
            {/* 월간 목표 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20">
              <h3 className="font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
                <Target size={18} className="text-tertiary" />
                이번 달 목표
              </h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" className="text-surface-container" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="16" fill="none" stroke="currentColor" className="text-tertiary"
                      strokeWidth="3" strokeDasharray={`${goalPercent} 100`} strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-on-surface">{goalPercent}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-headline font-bold text-on-surface">{mockReaderStats.monthlyCompleted}/{mockReaderStats.monthlyGoal}</p>
                  <p className="text-xs text-on-surface-variant">완독 목표</p>
                </div>
              </div>
            </div>

            {/* 최근 완독 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20">
              <h3 className="font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-secondary" />
                최근 완독
              </h3>
              <div className="space-y-3">
                {mockCompletedRecent.map((book) => (
                  <div key={book.id} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-secondary flex-shrink-0" />
                    <div className="min-w-0 flex-grow">
                      <p className="text-sm font-bold text-on-surface truncate">{book.title}</p>
                      <p className="text-xs text-on-surface-variant">{book.completedDate}</p>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: book.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xs">★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderDashboardPage;
