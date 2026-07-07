-- Nexa Web Service — Supabase schema
-- Run this once in the Supabase SQL Editor before running seed.sql.
-- Every table is public-read (anon/authenticated SELECT via RLS) and has no
-- public write policy — the publishable key can only ever read. Edit content
-- via the Supabase Table Editor (which runs as the table owner).

-- ============================================================================
-- SITE-WIDE
-- ============================================================================

create table if not exists nav_items (
  id serial primary key,
  label text not null,
  path text not null,
  icon_svg text,
  exact_match boolean not null default false,
  sort_order int not null default 0
);

create table if not exists footer_links (
  id serial primary key,
  group_name text not null check (group_name in ('quick_links', 'services', 'legal')),
  label text not null,
  path text not null,
  sort_order int not null default 0
);

create table if not exists social_links (
  id serial primary key,
  context text not null default 'footer',
  platform text not null,
  url text not null,
  icon_svg text,
  sort_order int not null default 0
);

-- Singleton row (id is always 1)
create table if not exists site_info (
  id int primary key default 1 check (id = 1),
  brand_name text not null default 'Nexa Web Service',
  brand_description text,
  logo_svg_header text,
  logo_svg_footer text,
  contact_email text,
  hours text,
  location text,
  whatsapp_url text,
  linkedin_url text,
  twitter_url text,
  copyright_start_year int
);

-- One row per page hero (badge/title/subtitle/CTAs). Home also uses
-- tech_badges/code_snippet for its "code window" visual.
create table if not exists page_heroes (
  id serial primary key,
  page text not null unique,
  badge text,
  title text not null,
  subtitle text,
  cta_primary_label text,
  cta_primary_link text,
  cta_secondary_label text,
  cta_secondary_link text,
  tech_badges text[],
  code_snippet text
);

create table if not exists page_seo (
  id serial primary key,
  slug text not null unique, -- matches Angular route path, '' for home
  title text not null,
  description text,
  keywords text,
  og_image_url text
);

-- ============================================================================
-- REUSABLE CONTENT BLOCKS (same card shapes reused across many pages)
-- ============================================================================

create table if not exists stat_blocks (
  id serial primary key,
  page text not null,     -- e.g. 'home', 'about', 'services', 'courses', 'portfolio'
  section text not null,  -- e.g. 'hero', 'trust', 'impact'
  icon text,
  value text not null,
  label text not null,
  description text,
  sort_order int not null default 0
);

create table if not exists feature_blocks (
  id serial primary key,
  page text not null,
  section text not null, -- e.g. 'value_props', 'why_choose_us', 'benefits', 'core_values', 'pricing_process'
  icon text,
  eyebrow text,          -- e.g. a leading number/stat shown before the title
  title text not null,
  description text,
  sort_order int not null default 0
);

-- ============================================================================
-- HOME / SERVICES
-- ============================================================================

create table if not exists services (
  id serial primary key,
  page text not null default 'home' check (page in ('home', 'services')),
  icon text,
  title text not null,
  short_description text,
  features text[],
  benefit_tags text[],
  sort_order int not null default 0
);

create table if not exists tech_stack_items (
  id serial primary key,
  icon text,
  name text not null,
  sort_order int not null default 0
);

-- ============================================================================
-- PORTFOLIO
-- ============================================================================

create table if not exists case_studies (
  id serial primary key,
  title text not null,
  company text,
  industry text,
  icon text,
  project_type text,
  duration text,
  team text,
  challenge text,
  solution text,
  results jsonb,           -- array of { metric, description }
  technologies text[],
  sort_order int not null default 0
);

create table if not exists industries (
  id serial primary key,
  icon text,
  name text not null,
  description text,
  sort_order int not null default 0
);

-- ============================================================================
-- TESTIMONIALS
-- ============================================================================

create table if not exists testimonials (
  id serial primary key,
  context text not null default 'home' check (context in ('home', 'portfolio')),
  quote text not null,
  author_name text not null,
  author_title text,
  company text,
  avatar_url text,
  rating numeric,
  sort_order int not null default 0
);

-- Intentionally left unseeded: no real client video IDs exist yet.
-- See memory note [[video-testimonials-restore]] — do not insert placeholder
-- YouTube IDs. Adding real rows here is now the entire "restore" process.
create table if not exists video_testimonials (
  id serial primary key,
  youtube_id text not null,
  title text,
  author text,
  sort_order int not null default 0
);

-- ============================================================================
-- PRICING / COURSES
-- ============================================================================

create table if not exists pricing_plans (
  id serial primary key,
  name text not null,
  description text,
  price text not null,
  unit text,
  featured boolean not null default false,
  icon text,
  features text[],
  sort_order int not null default 0
);

create table if not exists course_pricing_tiers (
  id serial primary key,
  name text not null,
  level text,
  level_class text,
  duration text,
  price text,
  sort_order int not null default 0
);

create table if not exists courses (
  id serial primary key,
  title text not null,
  level text,
  level_class text,
  description text,
  topics text[],
  duration text,
  price text,
  icon_svg text,
  sort_order int not null default 0
);

-- ============================================================================
-- FAQ
-- ============================================================================

create table if not exists faq_categories (
  id serial primary key,
  label text not null,
  icon text,
  sort_order int not null default 0
);

create table if not exists faq_items (
  id serial primary key,
  category_id int not null references faq_categories(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- ============================================================================
-- BLOG (replaces src/assets/articles/*.json)
-- ============================================================================

create table if not exists blog_articles (
  id text primary key, -- slug, matches previous JSON file name
  title text not null,
  excerpt text,
  content text,
  date date,
  category text,
  read_time int,
  icon text,
  tags text[],
  featured boolean not null default false,
  author_name text,
  author_role text,
  author_avatar text,
  sort_order int not null default 0
);

create table if not exists blog_categories (
  id serial primary key,
  name text not null,
  icon text,
  sort_order int not null default 0
);

create table if not exists blog_topics (
  id serial primary key,
  icon text,
  name text not null,
  description text,
  count int not null default 0,
  sort_order int not null default 0
);

-- ============================================================================
-- ABOUT
-- ============================================================================

-- Singleton row (id is always 1)
create table if not exists about_story (
  id int primary key default 1 check (id = 1),
  paragraph_1 text,
  paragraph_2 text,
  highlights jsonb, -- array of { icon, title, description }
  quote_text text,
  quote_author text
);

create table if not exists milestones (
  id serial primary key,
  year text,
  title text not null,
  description text,
  sort_order int not null default 0
);

create table if not exists expertise_areas (
  id serial primary key,
  icon text,
  title text not null,
  description text,
  tech_stack text[],
  sort_order int not null default 0
);

-- ============================================================================
-- ROW LEVEL SECURITY — public read-only for every table above
-- ============================================================================

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'nav_items', 'footer_links', 'social_links', 'site_info', 'page_heroes', 'page_seo',
      'stat_blocks', 'feature_blocks',
      'services', 'tech_stack_items',
      'case_studies', 'industries',
      'testimonials', 'video_testimonials',
      'pricing_plans', 'course_pricing_tiers', 'courses',
      'faq_categories', 'faq_items',
      'blog_articles', 'blog_categories', 'blog_topics',
      'about_story', 'milestones', 'expertise_areas'
    ])
  loop
    execute format('alter table %I enable row level security', t);
    execute format(
      'drop policy if exists "Public read access" on %I', t
    );
    execute format(
      'create policy "Public read access" on %I for select using (true)', t
    );
  end loop;
end $$;

-- ============================================================================
-- STORAGE — public "media" bucket, read-only for anon/authenticated
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read access for media" on storage.objects;
create policy "Public read access for media"
  on storage.objects for select
  using (bucket_id = 'media');
