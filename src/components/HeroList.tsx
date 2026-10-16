import { useState } from 'react'
import type { Hero } from '../types/hero'
import HeroCard from './HeroCard'

interface HeroListProps {
  heroes: Hero[]
}

const TROOP_OPTIONS = ['전체', '보병', '창병', '궁병'] as const
type TroopFilter = (typeof TROOP_OPTIONS)[number]

export default function HeroList({ heroes }: HeroListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTroop, setSelectedTroop] = useState<TroopFilter>('전체')

  const handleReset = () => {
    setSearchQuery('')
    setSelectedTroop('전체')
  }

  // 검색어 정제: 앞뒤 공백 제거 및 영문 소문자화
  const cleanQuery = searchQuery.trim().toLowerCase()

  // 검색과 병종 필터 AND 조건 적용
  const filteredHeroes = heroes.filter((hero) => {
    const matchName =
      cleanQuery === '' ||
      hero.nameKo.toLowerCase().includes(cleanQuery) ||
      (hero.nameEn ? hero.nameEn.toLowerCase().includes(cleanQuery) : false)

    const matchTroop =
      selectedTroop === '전체' || hero.troopType === selectedTroop

    return matchName && matchTroop
  })

  return (
    <section className="w-full space-y-6">
      {/* 컨트롤 영역: 검색창 & 병종 필터 */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* 검색 입력란 */}
          <div className="relative flex-1">
            <label htmlFor="hero-search-input" className="sr-only">
              영웅 이름 검색 (한글 또는 영문)
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="영웅 이름 검색 (예: 세르게이, Jessie)..."
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                aria-label="검색어 지우기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>

          {/* 병종 선택 버튼 그룹 */}
          <div
            role="group"
            aria-label="병종 필터"
            className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap"
          >
            {TROOP_OPTIONS.map((troop) => {
              const isSelected = selectedTroop === troop
              return (
                <button
                  key={troop}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedTroop(troop)}
                  className={`flex-1 sm:flex-none rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 border ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  {troop}
                </button>
              )
            })}
          </div>
        </div>

        {/* 정보 바: 표시 중인 영웅 수 & 전체 영웅 수 */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
          <div className="text-slate-400">
            표시 중 <strong className="text-cyan-300 font-semibold">{filteredHeroes.length}</strong>명 / 전체{' '}
            <strong className="text-slate-200 font-semibold">{heroes.length}</strong>명
          </div>
          {(searchQuery !== '' || selectedTroop !== '전체') && (
            <button
              type="button"
              onClick={handleReset}
              className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.5a.75.75 0 00-.75.75v3.733a.75.75 0 001.5 0v-2.185l.44.44a7 7 0 0011.83-3.238.75.75 0 00-1.408-.356zM4.688 8.576a5.5 5.5 0 019.201-2.466l.312.311h-2.433a.75.75 0 000 1.5H15.5a.75.75 0 00.75-.75V3.438a.75.75 0 00-1.5 0v2.185l-.44-.44A7 7 0 002.48 8.421a.75.75 0 001.408.355z"
                  clipRule="evenodd"
                />
              </svg>
              필터 초기화
            </button>
          )}
        </div>
      </div>

      {/* 결과 화면 */}
      {filteredHeroes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredHeroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      ) : (
        /* 검색/필터 결과가 없을 때 */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-12 px-4 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <p className="text-base font-semibold text-slate-200">
            조건에 맞는 영웅이 없습니다
          </p>
          <p className="mt-1 text-xs text-slate-400">
            검색어 오타를 확인하거나 병종 필터를 변경해 보세요.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors"
          >
            검색·필터 초기화
          </button>
        </div>
      )}
    </section>
  )
}
