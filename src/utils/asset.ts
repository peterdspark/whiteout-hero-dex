/**
 * 정적 자원(이미지 등)의 URL을 현재 환경의 기본 경로(BASE_URL)에 맞추어 변환합니다.
 *
 * - Vercel 및 로컬 개발: BASE_URL = '/' -> '/assets/heroes/...'
 * - GitHub Pages: BASE_URL = '/whiteout-hero-dex/' -> '/whiteout-hero-dex/assets/heroes/...'
 * - 외부 절대 URL(https://, http://)이나 인라인 데이터/블롭(data:, blob:)은 원본을 그대로 유지합니다.
 * - 이미 BASE_URL이 접두사로 포함된 경우 중복 적용을 방지합니다.
 */
export function getAssetUrl(path: string | null | undefined): string {
  if (!path) return ''

  // 외부 URL, 프로토콜 상대 URL, data URI, blob URI는 원본 그대로 반환
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path
  }

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`

  // 이미 BASE_URL이 접두사로 포함되어 있다면 중복 부착 방지
  if (path.startsWith(normalizedBase)) {
    return path
  }

  // base가 '/'이고 path가 이미 '/'로 시작하면 그대로 반환 (예: '/assets/...')
  if (normalizedBase === '/' && path.startsWith('/')) {
    return path
  }

  // 상대 경로 또는 '/'로 시작하는 경로를 normalizedBase와 결합
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${normalizedBase}${cleanPath}`
}
