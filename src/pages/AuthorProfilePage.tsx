import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Heart, PenTool, Sparkles, Star, UserCheck, UserPlus } from "lucide-react";
import { isLoggedIn } from "../lib/auth";
import { fetchAuthorFollowStatus, followAuthor, unfollowAuthor } from "../lib/api";

interface AuthorBookMock {
  bookId: string;
  title: string;
  coverImageUrl: string;
  likeCount: number;
  rating: number;
}

interface AuthorProfileMock {
  userId: string;
  nickname: string;
  profileImage: string;
  bio: string;
  joinedAt: string;
  stats: {
    bookCount: number;
    totalLikes: number;
    averageRating: number;
    followers: number;
  };
  books: AuthorBookMock[];
}

const MOCK_AUTHORS: Record<string, AuthorProfileMock> = {
  default: {
    userId: "default",
    nickname: "하늘봄",
    profileImage: "https://i.pravatar.cc/240?u=author-haneulbom",
    bio: "어린이와 어른 모두가 함께 읽을 수 있는 따뜻한 그림책을 만들고 있어요. 별과 숲, 그리고 작은 친구들의 이야기를 좋아합니다.",
    joinedAt: "2024년 3월 가입",
    stats: {
      bookCount: 12,
      totalLikes: 3_420,
      averageRating: 4.7,
      followers: 284,
    },
    books: [
      {
        bookId: "author-book-1",
        title: "별빛 요정의 모험",
        coverImageUrl: "https://picsum.photos/seed/author-book-1/600/800",
        likeCount: 1240,
        rating: 4.9,
      },
      {
        bookId: "author-book-2",
        title: "숲속 친구들",
        coverImageUrl: "https://picsum.photos/seed/author-book-2/600/800",
        likeCount: 856,
        rating: 4.7,
      },
      {
        bookId: "author-book-3",
        title: "구름 위의 우체국",
        coverImageUrl: "https://picsum.photos/seed/author-book-3/600/800",
        likeCount: 712,
        rating: 4.6,
      },
      {
        bookId: "author-book-4",
        title: "무지개 다리",
        coverImageUrl: "https://picsum.photos/seed/author-book-4/600/800",
        likeCount: 540,
        rating: 4.5,
      },
      {
        bookId: "author-book-5",
        title: "달빛 도서관",
        coverImageUrl: "https://picsum.photos/seed/author-book-5/600/800",
        likeCount: 432,
        rating: 4.8,
      },
      {
        bookId: "author-book-6",
        title: "바람꽃 정원",
        coverImageUrl: "https://picsum.photos/seed/author-book-6/600/800",
        likeCount: 318,
        rating: 4.4,
      },
    ],
  },
};

const AuthorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const author = useMemo<AuthorProfileMock>(() => {
    if (id && MOCK_AUTHORS[id]) return MOCK_AUTHORS[id];
    return { ...MOCK_AUTHORS.default, userId: id ?? "default" };
  }, [id]);

  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState<number | null>(null);
  const [followPending, setFollowPending] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    fetchAuthorFollowStatus(id)
      .then((status) => {
        if (cancelled) return;
        setFollowing(status.followedByMe);
        setFollowerCount(status.followerCount);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleToggleFollow = async () => {
    if (!id || followPending) return;
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    setFollowPending(true);
    try {
      const status = following ? await unfollowAuthor(id) : await followAuthor(id);
      setFollowing(status.followedByMe);
      setFollowerCount(status.followerCount);
    } catch (err) {
      alert(err instanceof Error ? err.message : "요청에 실패했습니다.");
    } finally {
      setFollowPending(false);
    }
  };

  const displayedFollowers = followerCount ?? author.stats.followers;

  const statCards = [
    { label: "작품 수", value: author.stats.bookCount.toLocaleString(), icon: BookOpen },
    { label: "총 좋아요", value: author.stats.totalLikes.toLocaleString(), icon: Heart },
    { label: "평균 평점", value: author.stats.averageRating.toFixed(1), icon: Star },
    { label: "팔로워", value: displayedFollowers.toLocaleString(), icon: UserPlus },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <ArrowLeft size={16} />
            작품 둘러보기로 돌아가기
          </Link>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden glass rounded-3xl p-6 md:p-10"
        >
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              <img
                src={author.profileImage}
                alt={`${author.nickname} 프로필`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-3 min-w-0">
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[11px] md:text-xs">
                <Sparkles size={14} />
                AUTHOR
              </div>
              <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface break-keep">{author.nickname}</h1>
              <p className="text-xs md:text-sm text-on-surface-variant">{author.joinedAt}</p>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed whitespace-pre-wrap">{author.bio}</p>
            </div>

            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={handleToggleFollow}
                disabled={followPending}
                className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold shadow-lg transition-colors disabled:opacity-60 ${
                  following
                    ? "border border-outline-variant/40 bg-white text-on-surface hover:bg-surface-container-low"
                    : "bg-primary text-on-primary hover:bg-secondary"
                }`}
              >
                {following ? <UserCheck size={16} /> : <UserPlus size={16} />}
                {following ? "팔로잉" : "팔로우"}
              </button>
              <button
                type="button"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-outline-variant/40 bg-white text-on-surface font-bold hover:bg-surface-container-low transition-colors"
              >
                <PenTool size={16} />
                메시지
              </button>
            </div>
          </div>
        </motion.section>

        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-4 md:p-5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <stat.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-on-surface-variant">{stat.label}</p>
                  <p className="text-lg md:text-xl font-headline font-bold text-on-surface truncate">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface flex items-center gap-2">
                <BookOpen size={22} className="text-primary" />
                작품 목록
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">{author.nickname} 작가의 작품 {author.books.length}권</p>
            </div>
          </div>

          {author.books.length === 0 ? (
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-10 text-center text-on-surface-variant">
              아직 등록된 작품이 없어요.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
              {author.books.map((book, i) => (
                <motion.div
                  key={book.bookId}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                  className="group"
                >
                  <Link to={`/book/${book.bookId}`} className="block space-y-3">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden book-shadow group-hover:-translate-y-1 transition-transform duration-500">
                      <img
                        src={book.coverImageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">{book.title}</h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-on-surface-variant">
                        <span className="inline-flex items-center gap-1">
                          <Heart size={12} className="text-rose-500" />
                          {book.likeCount.toLocaleString()}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          {book.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AuthorProfilePage;
