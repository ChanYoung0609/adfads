import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  BookOpen, PenTool, Eye, Heart, TrendingUp,
  BarChart3, Clock, Users, Star, ArrowRight
} from "lucide-react";
import { isLoggedIn } from "../lib/auth";

// TODO: 실제 API 연동
const mockStats = {
  totalBooks: 12,
  totalReads: 1_580,
  totalLikes: 342,
  totalFollowers: 89,
  readingStreak: 7,
  avgReadTime: 15,
};

const mockRecentActivity = [
  { id: "1", type: "read" as const, title: "달빛 요정의 모험", time: "2시간 전", progress: 75 },
  { id: "2", type: "write" as const, title: "숲속 친구들", time: "어제", progress: 40 },
  { id: "3", type: "read" as const, title: "바다 위의 별", time: "3일 전", progress: 100 },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface">
            대시보드
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg">
            나의 활동과 통계를 한눈에 확인하세요.
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "내 작품", value: mockStats.totalBooks, icon: BookOpen, color: "primary" },
            { label: "총 조회수", value: mockStats.totalReads.toLocaleString(), icon: Eye, color: "secondary" },
            { label: "받은 좋아요", value: mockStats.totalLikes, icon: Heart, color: "error" },
            { label: "팔로워", value: mockStats.totalFollowers, icon: Users, color: "tertiary" },
            { label: "연속 읽기", value: `${mockStats.readingStreak}일`, icon: TrendingUp, color: "primary" },
            { label: "평균 읽기", value: `${mockStats.avgReadTime}분`, icon: Clock, color: "secondary" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20 space-y-3"
            >
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-headline font-bold text-on-surface">{stat.value}</p>
                <p className="text-xs text-on-surface-variant">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 최근 활동 */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-headline font-bold text-on-surface">최근 활동</h2>
              <Link to="/library" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                전체 보기 <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === "read" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                  }`}>
                    {activity.type === "read" ? <BookOpen size={20} /> : <PenTool size={20} />}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-on-surface truncate">{activity.title}</p>
                    <p className="text-xs text-on-surface-variant">{activity.time}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${activity.progress === 100 ? "bg-secondary" : "bg-primary"}`}
                        style={{ width: `${activity.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant w-10 text-right">{activity.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 바로가기 */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-6 text-on-primary">
              <PenTool size={28} className="mb-4" />
              <h3 className="text-lg font-headline font-bold mb-2">새 이야기 만들기</h3>
              <p className="text-on-primary/80 text-sm mb-4">AI와 함께 새로운 동화를 만들어보세요.</p>
              <Link to="/create" className="inline-block px-5 py-2.5 bg-white/20 rounded-full text-sm font-bold hover:bg-white/30 transition-colors">
                시작하기
              </Link>
            </div>

            <Link to="/dashboard/author" className="block bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 hover:border-primary/30 transition-colors group">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 size={20} className="text-primary" />
                <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">작가 대시보드</h3>
              </div>
              <p className="text-sm text-on-surface-variant">작품 성과와 수익을 확인하세요.</p>
            </Link>

            <Link to="/dashboard/reader" className="block bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/20 hover:border-secondary/30 transition-colors group">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen size={20} className="text-secondary" />
                <h3 className="font-headline font-bold text-on-surface group-hover:text-secondary transition-colors">리더 대시보드</h3>
              </div>
              <p className="text-sm text-on-surface-variant">읽기 기록과 진행률을 확인하세요.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
