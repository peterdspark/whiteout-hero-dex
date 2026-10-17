export type HeroRarity = '신화' | '에픽' | '레어' | string;
export type TroopType = '보병' | '창병' | '궁병' | string;

export interface Hero {
  id: string;
  nameKo: string;
  nameEn?: string | null;
  rarity?: HeroRarity | null;
  troopType: TroopType;
  generation?: number | null;
  imageUrl?: string | null;
  subtype?: string | null;
}
