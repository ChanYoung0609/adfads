import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { isLoggedIn } from "../lib/auth";
import { fetchMyRevenue } from "../lib/api";

const monthLabels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

const AuthorRevenuePage = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyRevenues, setMonthlyRevenues] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;
    fetchMyRevenue(selectedYear)
      .then((data) => {
        if (cancelled) return;
        const next = Array(12).fill(0);
        data.monthlyRevenues.forEach((item) => {
          if (item.month >= 1 && item.month <= 12) next[item.month - 1] = item.totalRevenue;
        });
        setMonthlyRevenues(next);
      })
      .catch(() => {
        if (!cancelled) setMonthlyRevenues(Array(12).fill(0));
      });
    return () => {
      cancelled = true;
    };
  }, [selectedYear]);

  const revenueData = useMemo(
    () => monthLabels.map((month, index) => ({ month, revenue: monthlyRevenues[index] })),
    [monthlyRevenues],
  );

  const maxMonthlyRevenue = Math.max(1, ...revenueData.map((item) => item.revenue));

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/author")}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface">수익 분석</h1>
            <p className="text-on-surface-variant text-sm md:text-base">월별 수익을 확인해보세요</p>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-outline-variant/20"
        >
          <h2 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-primary" />
            월별 수익 그래프
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => setSelectedYear((prev) => prev - 1)}
              className="w-9 h-9 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="이전 연도"
            >
              {"<"}
            </button>
            <p className="text-lg md:text-xl font-headline font-bold text-on-surface min-w-20 text-center">
              {selectedYear}
            </p>
            <button
              type="button"
              onClick={() => setSelectedYear((prev) => prev + 1)}
              className="w-9 h-9 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="다음 연도"
            >
              {">"}
            </button>
          </div>
          <div className="h-72 flex items-end gap-2 md:gap-3">
            {revenueData.map((item, index) => {
              const heightRatio = (item.revenue / maxMonthlyRevenue) * 100;
              return (
                <div key={`${selectedYear}-${item.month}`} className="flex-1 h-full flex flex-col justify-end items-center">
                  <p className="text-[10px] md:text-xs text-on-surface-variant mb-2">{item.revenue.toLocaleString()}원</p>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.06 }}
                    style={{ transformOrigin: "bottom", height: `${Math.max(heightRatio, 8)}%` }}
                    className="w-full max-w-14 rounded-t-xl bg-gradient-to-t from-primary to-secondary shadow-sm"
                  />
                  <p className="text-xs md:text-sm text-on-surface-variant mt-2">{item.month}</p>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AuthorRevenuePage;
