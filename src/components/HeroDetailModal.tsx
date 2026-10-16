import { useEffect, useRef, useState } from 'react'
import type { Hero } from '../types/hero'

interface HeroDetailModalProps {
  hero: Hero | null
  onClose: () => void
}

export default function HeroDetailModal({ hero, onClose }: HeroDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [imageError, setImageError] = useState(false)



  // dialog showModal / close 제어 및 배경 스크롤 차단
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (hero) {
      if (!dialog.open) {
        dialog.showModal()
      }
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalOverflow
        if (dialog.open) {
          dialog.close()
        }
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [hero])

  // Escape 키 누름 시 브라우저 cancel 이벤트 처리
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault()
    onClose()
  }

  // 모달 바깥 배경(backdrop) 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  if (!hero) return null

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
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="hero-detail-modal-title"
      className="backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto max-w-md w-[calc(100%-2rem)] max-h-[90vh] rounded-2xl border border-slate-800 text-slate-100 shadow-2xl focus:outline-none"
    >
      <div
        className="flex flex-col max-h-[90vh] bg-slate-900/95 backdrop-blur-md rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더: 등급/병종 뱃지 및 닫기 버튼 */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${getRarityBadge(
                hero.rarity
              )}`}
            >
              {hero.rarity ?? '미확인'}
            </span>
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${getTroopBadge(
                hero.troopType
              )}`}
            >
              {hero.troopType}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="상세 정보 모달 닫기"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* 본문 스크롤 영역: 360px 너비나 낮은 화면에서도 스크롤 가능 */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* 이미지 영역 */}
          <div className="relative aspect-square w-full max-w-[240px] mx-auto overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/60 flex items-center justify-center">
            {!showFallback ? (
              <img
                src={hero.imageUrl!}
                alt={`${hero.nameKo} 초상화`}
                onError={() => setImageError(true)}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/80 text-cyan-400 ring-1 ring-cyan-500/20">
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
                </div>
                <p className="text-xs font-medium text-slate-300">
                  {hero.imageUrl && imageError ? '이미지 로드 실패' : '이미지 준비 중'}
                </p>
              </div>
            )}
            <div className="absolute bottom-2 left-2">
              <span className="inline-flex items-center rounded-md bg-slate-950/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 backdrop-blur-sm border border-slate-800">
                {hero.generation ? `${hero.generation}세대` : '미확인'}
              </span>
            </div>
          </div>

          {/* 영웅 이름 (접근 가능한 제목) */}
          <div className="text-center">
            <h2
              id="hero-detail-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight"
            >
              {hero.nameKo}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              {hero.nameEn ?? '미확인'}
            </p>
          </div>

          {/* 상세 정보 표 (임의 데이터 생성 없이 현재 존재하는 필드만 단정하게 구성) */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5">
            <dl className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <dt className="text-slate-400">등급</dt>
                <dd className="mt-1 font-semibold text-slate-200">
                  {hero.rarity ?? '미확인'}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">병종</dt>
                <dd className="mt-1 font-semibold text-slate-200">
                  {hero.troopType}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">세대</dt>
                <dd className="mt-1 font-semibold text-slate-200">
                  {hero.generation ? `${hero.generation}세대` : '미확인'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 모달 하단 푸터: 닫기 버튼 */}
        <div className="border-t border-slate-800/80 px-4 py-3 sm:px-5 flex justify-end bg-slate-950/40">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            닫기
          </button>
        </div>
      </div>
    </dialog>
  )
}
