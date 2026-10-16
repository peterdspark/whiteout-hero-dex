import type { Hero } from '../types/hero'
import HeroCard from './HeroCard'

interface HeroListProps {
  heroes: Hero[]
}

export default function HeroList({ heroes }: HeroListProps) {
  return (
    <section className="w-full">
      {/* 목록 상단 안내 바 */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-200">
            영웅 목록
          </h2>
          <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">
            총 {heroes.length}명
          </span>
        </div>
        <p className="text-xs text-amber-300/90 font-medium">
          ※ 현재 화면의 데이터는 UI 확인용 가상 샘플 데이터입니다.
        </p>
      </div>

      {/* 반응형 그리드: 모바일(360px) 1열, 태블릿 2열, 데스크톱(넓은 화면) 3열 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </section>
  )
}
