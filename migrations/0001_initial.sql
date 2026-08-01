PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  image_urls TEXT NOT NULL DEFAULT '[]',
  alt_text TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  smartstore_url TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('available','sold_out')),
  is_visible INTEGER NOT NULL DEFAULT 0 CHECK(is_visible IN (0,1)),
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK(is_featured IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT NOT NULL,
  body TEXT NOT NULL,
  external_url TEXT,
  is_visible INTEGER NOT NULL DEFAULT 0 CHECK(is_visible IN (0,1)),
  published_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  hours TEXT,
  image_url TEXT,
  alt_text TEXT NOT NULL DEFAULT '',
  naver_map_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  is_visible INTEGER NOT NULL DEFAULT 0 CHECK(is_visible IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  inquiry_no TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT NOT NULL,
  company TEXT,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','completed')),
  result TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS retention_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deleted_count INTEGER NOT NULL,
  executed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_public ON products(is_visible,sort_order);
CREATE INDEX IF NOT EXISTS idx_news_public ON news_posts(is_visible,published_at);
CREATE INDEX IF NOT EXISTS idx_stores_public ON stores(is_visible,sort_order);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status,created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_retention ON inquiries(status,completed_at);

INSERT INTO stores (name, description, naver_map_url, is_visible, sort_order) VALUES
('신세계 프리미엄 아울렛 시흥꿈상회','매장 주소와 현재 입점 여부를 확인한 뒤 공개해 주세요.','https://map.naver.com/p/search/시흥꿈상회',0,10),
('경기시흥작은자리지역자활센터 생활쏙','매장 주소와 현재 입점 여부를 확인한 뒤 공개해 주세요.','https://map.naver.com/p/search/생활쏙',0,20),
('국립백두대간수목원 가든샵','매장 주소와 현재 입점 여부를 확인한 뒤 공개해 주세요.','https://map.naver.com/p/search/국립백두대간수목원',0,30),
('국립세종수목원 기프트샵','매장 주소와 현재 입점 여부를 확인한 뒤 공개해 주세요.','https://map.naver.com/p/search/국립세종수목원',0,40);
