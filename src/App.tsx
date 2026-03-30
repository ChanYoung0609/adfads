import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Compass, 
  Library, 
  User, 
  PlusCircle, 
  Search, 
  Heart, 
  Star, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  LogOut,
  Info,
  Globe,
  Sparkles,
  Palette,
  FileText
} from "lucide-react";
import { cn } from "./lib/utils";
import { MOCK_BOOKS, CATEGORIES, STYLES } from "./constants";
import { Book, IllustrationStyle, StoryWizardState } from "./types";

// --- Components ---

const Navbar = () => {
  const location = useLocation();
  const isReading = location.pathname.startsWith('/read');

  if (isReading) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-8 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles size={24} />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-primary">StoryMagic</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/explore" className={cn("text-sm font-medium hover:text-primary transition-colors", location.pathname === '/explore' ? "text-primary" : "text-on-surface-variant")}>검색</Link>
          <Link to="/library" className={cn("text-sm font-medium hover:text-primary transition-colors", location.pathname === '/library' ? "text-primary" : "text-on-surface-variant")}>내 서재</Link>
          <Link to="/create" className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-secondary transition-all shadow-md hover:shadow-lg active:scale-95">
            <PlusCircle size={18} />
            그림책 만들기
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors">
            <img src="https://i.pravatar.cc/150?u=jang" alt="프로필" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- Pages ---

const LandingPage = () => {
  return (
    <div className="min-h-screen pt-24 magical-gradient">
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest">
            <Sparkles size={16} />
            AI 기반 스토리텔링
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] max-w-4xl mx-auto">
            AI로 당신만의 <span className="text-primary italic">마법 같은</span> 동화책을 만드세요
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-medium">
            아이의 상상력이 현실이 되는 공간. 몇 번의 클릭만으로 고퀄리티 일러스트와 함께 나만의 이야기를 완성하세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Link to="/create" className="px-10 py-5 bg-primary text-white rounded-full text-lg font-bold shadow-2xl hover:bg-secondary transition-all hover:-translate-y-1 active:scale-95">
              지금 시작하기
            </Link>
            <Link to="/explore" className="px-10 py-5 glass text-on-surface rounded-full text-lg font-bold hover:bg-white transition-all hover:-translate-y-1 active:scale-95">
              갤러리 둘러보기
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-24 relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden book-shadow"
        >
          <img 
            src="https://picsum.photos/seed/magic/1920/1080" 
            alt="메인 이미지" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
            <div className="text-white text-left">
              <h3 className="text-3xl font-display font-bold">속삭이는 버드나무</h3>
              <p className="text-white/80">사라 젠킨스 • 24 페이지 • 마법 수채화</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Sparkles size={32} />
              </div>
              <h4 className="text-2xl font-bold">AI 스토리텔링</h4>
              <p className="text-on-surface-variant">간단한 키워드만으로 풍부하고 교훈적인 이야기를 생성합니다.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <Palette size={32} />
              </div>
              <h4 className="text-2xl font-bold">마법 수채화</h4>
              <p className="text-on-surface-variant">수채화부터 유화까지, AI가 그리는 마법 같은 일러스트레이션.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                <BookOpen size={32} />
              </div>
              <h4 className="text-2xl font-bold">실물 도서 제작</h4>
              <p className="text-on-surface-variant">디지털을 넘어 실제 하드커버 책으로 간직할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("전체");

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              무한한 세계, <br />
              <span className="text-primary italic">한 페이지씩</span> 완성됩니다
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl">
              우리 커뮤니티가 만든 수천 개의 AI 생성 이야기를 만나보세요. 깊은 우주부터 마법의 숲까지.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-bold transition-all",
                  selectedCategory === cat 
                    ? "bg-primary text-white shadow-lg" 
                    : "glass text-on-surface-variant hover:bg-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_BOOKS.filter(b => selectedCategory === "전체" || b.category === selectedCategory).map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/book/${book.id}`}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden book-shadow mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 flex items-center gap-1 text-xs font-bold">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {book.rating}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-500">
                      <BookOpen size={32} />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-on-surface-variant text-sm font-medium">{book.author} 작가</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary/60">{book.category}</span>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <Heart size={14} />
                    <span className="text-xs font-bold">{book.likes}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookDetailPage = () => {
  const book = MOCK_BOOKS[0]; // Just for demo

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-32"
        >
          <div className="aspect-[3/4] rounded-3xl overflow-hidden book-shadow">
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="mt-8 flex gap-4">
            <Link to={`/read/${book.id}`} className="flex-1 bg-primary text-white py-5 rounded-2xl text-center font-bold text-lg shadow-xl hover:bg-secondary transition-all active:scale-95">
              이야기 읽기
            </Link>
            <button className="flex-1 glass py-5 rounded-2xl text-center font-bold text-lg hover:bg-white transition-all active:scale-95">
              양장본 구매하기
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
              <Sparkles size={16} />
              에디터 추천
            </div>
            <h1 className="text-6xl font-display font-bold leading-tight">{book.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="작가" className="w-8 h-8 rounded-full" />
                <span className="font-bold">사라 젠킨스</span>
              </div>
              <div className="h-4 w-[1px] bg-on-surface-variant/20" />
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} className="fill-current" />
                <span className="font-bold text-on-surface">{book.rating}</span>
                <span className="text-on-surface-variant font-medium">(1.2k 리뷰)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass p-4 rounded-2xl text-center">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">분량</p>
              <p className="font-bold">{book.length}</p>
            </div>
            <div className="glass p-4 rounded-2xl text-center">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">언어</p>
              <p className="font-bold">{book.language}</p>
            </div>
            <div className="glass p-4 rounded-2xl text-center">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">형식</p>
              <p className="font-bold">디지털</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">이야기 소개</h3>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              {book.description}
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-on-surface-variant/10">
            <h3 className="text-2xl font-bold">커뮤니티 피드백</h3>
            <div className="space-y-6">
              {book.reviews.map(review => (
                <div key={review.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-bold">{review.user}</p>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < review.rating ? "fill-current" : ""} />)}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-on-surface-variant">{review.date}</span>
                  </div>
                  <p className="text-on-surface-variant">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ReadingPage = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const book = MOCK_BOOKS[0];

  return (
    <div className="h-screen bg-on-surface flex flex-col overflow-hidden">
      <div className="p-6 flex items-center justify-between text-white/60">
        <Link to={`/book/${book.id}`} className="flex items-center gap-2 hover:text-white transition-colors">
          <ChevronLeft size={24} />
          <span className="font-bold">상세 페이지로</span>
        </Link>
        <div className="flex flex-col items-center">
          <h2 className="text-white font-display font-bold text-xl">{book.title}</h2>
          <p className="text-xs uppercase tracking-widest font-bold">제 1장: 깨어남</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-white transition-colors"><Settings size={20} /></button>
          <button className="p-2 hover:text-white transition-colors"><Info size={20} /></button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-full max-w-7xl aspect-[2/1] flex gap-1 bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Left Page: Illustration */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentPage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                src={book.pages[currentPage]?.imageUrl || book.coverUrl} 
                alt="페이지 일러스트" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute bottom-8 left-8 glass px-4 py-2 rounded-full text-xs font-bold">
              {currentPage + 1} 페이지
            </div>
          </div>

          {/* Right Page: Text */}
          <div className="flex-1 bg-surface-container-lowest p-16 flex flex-col justify-center relative">
            <div className="absolute top-8 right-8 text-primary/20">
              <Sparkles size={48} />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <p className="text-3xl font-display leading-relaxed text-on-surface">
                  {book.pages[currentPage]?.text || "이야기가 여기서 시작됩니다..."}
                </p>
                
                <div className="pt-12 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Sparkles size={16} />
                    마법 팁
                  </div>
                  <p className="text-on-surface-variant italic">
                    "버드나무가 살아 움직이는 것처럼 부드럽고 속삭이는 목소리로 이 부분을 읽어보세요!"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-16 left-16 right-16 flex items-center justify-between">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white transition-all disabled:opacity-30"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex-1 mx-8 h-1 bg-on-surface-variant/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary" 
                  initial={false}
                  animate={{ width: `${((currentPage + 1) / book.pages.length) * 100}%` }}
                />
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(book.pages.length - 1, prev + 1))}
                disabled={currentPage === book.pages.length - 1}
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-all disabled:opacity-30"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WizardPage = () => {
  const [step, setStep] = React.useState(1);
  const [state, setState] = React.useState<StoryWizardState>({
    pageCount: 12,
    style: 'watercolor',
    prompt: '',
    title: ''
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 magical-gradient">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                step === s ? "bg-primary text-white scale-110 shadow-lg" : 
                step > s ? "bg-green-500 text-white" : "glass text-on-surface-variant"
              )}>
                {s}
              </div>
              <span className={cn("font-bold text-sm uppercase tracking-widest", step === s ? "text-primary" : "text-on-surface-variant")}>
                {s === 1 ? "컨셉" : s === 2 ? "스토리" : "검토"}
              </span>
              {s < 3 && <div className="w-20 h-[2px] bg-on-surface-variant/10" />}
            </div>
          ))}
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-12 rounded-3xl space-y-10"
        >
          {step === 1 && (
            <>
              <div className="space-y-2">
                <h2 className="text-4xl font-display font-bold">아이디어를 현실로 만드세요</h2>
                <p className="text-on-surface-variant">만들고 싶은 세계에 대해 알려주세요.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">페이지 수</label>
                  <div className="flex gap-2">
                    {[12, 24, 32].map(count => (
                      <button
                        key={count}
                        onClick={() => setState({...state, pageCount: count})}
                        className={cn(
                          "flex-1 py-4 rounded-xl font-bold transition-all",
                          state.pageCount === count ? "bg-primary text-white shadow-lg" : "bg-surface-container-low hover:bg-white"
                        )}
                      >
                        {count} 페이지
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">일러스트 스타일</label>
                  <select 
                    value={state.style}
                    onChange={(e) => setState({...state, style: e.target.value as IllustrationStyle})}
                    className="w-full p-4 rounded-xl bg-surface-container-low font-bold border-none focus:ring-2 focus:ring-primary outline-none"
                  >
                    {STYLES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">스토리 프롬프트</label>
                <textarea 
                  placeholder="예: 구름 속에 숨겨진 도시를 발견하는 용감한 작은 다람쥐 이야기..."
                  className="w-full h-40 p-6 rounded-2xl bg-surface-container-low font-medium border-none focus:ring-2 focus:ring-primary outline-none resize-none"
                  value={state.prompt}
                  onChange={(e) => setState({...state, prompt: e.target.value})}
                />
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!state.prompt}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                스토리 생성 시작하기
              </button>
            </>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center py-20 text-center space-y-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <Sparkles size={40} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-display font-bold">마법을 엮는 중...</h3>
                <p className="text-on-surface-variant">AI가 당신만의 독특한 이야기를 만들고 일러스트를 그리고 있습니다.</p>
              </div>
              <button onClick={() => setStep(3)} className="text-primary font-bold hover:underline">건너뛰기 (데모)</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-32 aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                  <img src="https://picsum.photos/seed/preview/300/400" alt="미리보기" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold">구름 다람쥐</h2>
                  <p className="text-on-surface-variant">장찬영 작가 • 12 페이지 • 마법 수채화</p>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low rounded-2xl">
                <p className="italic text-on-surface-variant">"거대한 참나무의 가장 높은 가지에, 구름을 만지는 꿈을 꾸는 너티라는 다람쥐가 살고 있었습니다. 어느 날, 하늘에서 황금 잎사귀가 떨어졌습니다..."</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 glass py-5 rounded-2xl font-bold">컨셉 수정</button>
                <Link to="/library" className="flex-1 bg-primary text-white py-5 rounded-2xl font-bold text-center shadow-xl hover:bg-secondary">서재에 저장하기</Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const LibraryPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-display font-bold">내 책장</h1>
          <Link to="/create" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-secondary transition-all">
            <PlusCircle size={20} />
            새 이야기 만들기
          </Link>
        </div>

        <div className="space-y-16">
          <section className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Sparkles size={24} className="text-primary" />
              </motion.div>
              제작 중
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-6 rounded-3xl flex gap-6 items-center">
                <div className="w-24 aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                  <img src="https://picsum.photos/seed/progress1/300/400" alt="도서" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold">구름 다람쥐</h4>
                    <p className="text-sm text-on-surface-variant">12 페이지 • 마법 수채화</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span>일러스트 생성 중</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 bg-on-surface-variant/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[65%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold">완성된 작품</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {MOCK_BOOKS.map(book => (
                <Link key={book.id} to={`/book/${book.id}`} className="group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden book-shadow mb-3 group-hover:-translate-y-1 transition-transform">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors truncate">{book.title}</h4>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="glass p-12 rounded-3xl flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
              <img src="https://i.pravatar.cc/150?u=jang" alt="프로필" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:scale-110 transition-transform">
              <Palette size={20} />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-display font-bold">장찬영</h1>
              <p className="text-on-surface-variant font-medium">2024년부터 활동 중인 마법의 이야기꾼</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">만든 책</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">공유한 이야기</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">받은 좋아요</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-secondary transition-all">프로필 수정</button>
            <button className="px-6 py-3 glass rounded-xl font-bold hover:bg-white transition-all">설정</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Heart size={20} className="text-red-500 fill-red-500" />
              좋아요 한 이야기
            </h3>
            <div className="space-y-4">
              {MOCK_BOOKS.slice(0, 2).map(book => (
                <div key={book.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-16 aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold group-hover:text-primary transition-colors">{book.title}</h4>
                    <p className="text-xs text-on-surface-variant">{book.author} 작가</p>
                  </div>
                  <ChevronRight size={20} className="text-on-surface-variant" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Settings size={20} className="text-primary" />
              계정 설정
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-on-surface-variant" />
                  <span className="font-medium">언어 설정</span>
                </div>
                <span className="text-sm font-bold text-primary">한국어</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-on-surface-variant" />
                  <span className="font-medium">구독 플랜</span>
                </div>
                <span className="text-sm font-bold text-primary">매직 프로</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 text-red-500 transition-all mt-4">
                <div className="flex items-center gap-3">
                  <LogOut size={20} />
                  <span className="font-bold">로그아웃</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<GalleryPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/read/:id" element={<ReadingPage />} />
            <Route path="/create" element={<WizardPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        
        <footer className="bg-white py-20 border-t border-on-surface-variant/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <span className="text-lg font-display font-bold tracking-tight text-primary">StoryMagic</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-on-surface-variant">
              <Link to="/" className="hover:text-primary">홈</Link>
              <Link to="/explore" className="hover:text-primary">검색</Link>
              <Link to="/create" className="hover:text-primary">제작</Link>
              <Link to="/library" className="hover:text-primary">서재</Link>
            </div>
            <p className="text-sm text-on-surface-variant">© 2026 StoryMagic AI. 모든 권리 보유.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
