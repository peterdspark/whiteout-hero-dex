import { useState } from 'react'
import type { Hero } from '../types/hero'

interface HeroCardProps {
  hero: Hero
  onSelect?: (hero: Hero, element: HTMLElement) => void
}

export default function HeroCard({ hero, onSelect }: HeroCardProps) {
  const [imageError, setImageError] = useState(false)

  // 등급별 스타일 매핑
  const getRarityBadge = (rarity?: string | null) => {
    switch (rarity) {
      case '신화':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      case '에픽':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30'
      case '레어':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }

  // 병종별 뱃지 스타일 매핑
  const getTroopBadge = (troopType: string) => {
    switch (troopType) {
      case '보병':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      case '창병':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
      case '궁병':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30'
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700'
    }
  }

  const showFallback = !hero.imageUrl || imageError

  return (
    <article className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/30">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${hero.nameKo} 상세 정보 보기`}
        onClick={(e) => onSelect?.(hero, e.currentTarget)}
        className="w-full text-left flex flex-col flex-1 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        {/* 상단 뱃지 영역: 등급 및 병종 */}
        <span className="mb-3 flex items-center justify-between gap-2 w-full">
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${getRarityBadge(
              hero.rarity,
            )}`}
          >
            {hero.rarity ?? '미확인'}
          </span>
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${getTroopBadge(
              hero.troopType,
            )}`}
          >
            {hero.troopType}
          </span>
        </span>

        {/* 영웅 이미지 또는 대체 화면(Fallback) */}
        <span className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/60">
          {!showFallback ? (
            <img
              src={hero.imageUrl!}
              alt={hero.nameKo}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <span className="flex flex-col items-center justify-center p-4 text-center">
              {/* 눈송이/얼음 모티브 아이콘 */}
              <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/80 text-cyan-400 ring-1 ring-cyan-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <span className="text-xs font-medium text-slate-300">
                {hero.imageUrl && imageError ? '이미지 로드 실패' : '이미지 준비 중'}
              </span>
            </span>
          )}

          {/* 세대 표시 태그 */}
          <span className="absolute bottom-2 left-2">
            <span className="inline-flex items-center rounded-md bg-slate-950/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 backdrop-blur-sm border border-slate-800">
              {hero.generation ? `${hero.generation}세대` : '미확인'}
            </span>
          </span>
        </span>

        {/* 영웅 정보: 이름 및 세부사항 */}
        <span className="flex flex-1 flex-col justify-between w-full">
          <span className="block">
            <span className="block text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors break-words">
              {hero.nameKo}
            </span>
            <span className="block text-xs font-medium text-slate-400 break-words mt-0.5">
              {hero.nameEn ?? '미확인'}
            </span>
          </span>

          <span className="mt-4 block border-t border-slate-800/80 pt-3 w-full">
            <span className="grid grid-cols-2 gap-2 text-xs">
              <span className="block">
                <span className="block text-slate-400">병종</span>
                <span className="block font-semibold text-slate-200 mt-0.5">{hero.troopType}</span>
              </span>
              <span className="block">
                <span className="block text-slate-400">세대</span>
                <span className="block font-semibold text-slate-200 mt-0.5">
                  {hero.generation ? `${hero.generation}세대` : '미확인'}
                </span>
              </span>
            </span>
          </span>
        </span>
      </button>
    </article>
  )
}
