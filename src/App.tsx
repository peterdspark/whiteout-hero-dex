import HeroList from './components/HeroList'
import rawHeroes from './data/heroes.json'
import type { Hero } from './types/hero'

const heroes: Hero[] = rawHeroes as Hero[]

export default function App() {
  return (
    <div className="min-h-screen w-full bg-radial-[at_50%_0%] from-slate-900 via-slate-950 to-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
        {/* 상단 헤더 영역: 기존 디자인 감성을 유지하며 컴팩트하게 배치 */}
        <header className="mb-6 sm:mb-10 text-center space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
            Whiteout Survival Hero Dex
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-medium tracking-wide">
            화이트아웃 서바이벌 영웅 도감
          </p>
        </header>

        {/* 메인 콘텐츠: 영웅 카드 목록 */}
        <main className="w-full">
          <HeroList heroes={heroes} />
        </main>
      </div>
    </div>
  )
}
