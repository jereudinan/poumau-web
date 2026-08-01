export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  thumbnail_url: string | null;
  image_urls: string;
  alt_text: string;
  summary: string;
  description: string;
  smartstore_url: string | null;
  status: 'available' | 'sold_out';
  is_visible: number;
  is_featured: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type NewsPost = {
  id: number;
  slug: string;
  title: string;
  thumbnail_url: string | null;
  alt_text: string;
  body: string;
  external_url: string | null;
  is_visible: number;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type Store = {
  id: number;
  name: string;
  address: string;
  hours: string | null;
  image_url: string | null;
  alt_text: string;
  naver_map_url: string;
  description: string;
  is_visible: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: number;
  inquiry_no: string;
  name: string | null;
  phone: string;
  company: string | null;
  inquiry_type: string;
  message: string;
  status: 'new' | 'completed';
  result: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};
