export const SITE = {
  name: '파우마우',
  title: '파우마우 | 패브릭 핸드메이드 전문',
  description: '일상의 가치가 소소한 행복으로. 파우마우는 정성스럽게 만든 패브릭 핸드메이드 제품과 커스텀 제작을 제안합니다.',
  url: 'https://poumau.com',
  smartStore: 'https://smartstore.naver.com/haruneko',
  blog: 'https://blog.naver.com/poumau',
  instagram: 'https://www.instagram.com/poumau_official/',
  youtube: 'https://www.youtube.com/@poumau-kr',
  address: '경기도 시흥시 시흥대로1073번길 39',
} as const;

export const PRODUCT_CATEGORIES = ['파우치·가방', '키링·소품', '패션·의류', '시즌·기획 상품'] as const;

export const NAV_ITEMS = [
  { href: '/about', label: '파우마우 소개' },
  { href: '/products', label: '상품소개' },
  { href: '/offline', label: '오프라인' },
  { href: '/news', label: '파우마우 소식' },
  { href: '/contact', label: '문의하기' },
] as const;
