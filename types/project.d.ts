export interface Project {
  uuid?: string;
  name?: string;
  title: string;
  description?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  author_name?: string;
  author_avatar_url?: string;
  tags?: string;
  category?: string;
  is_featured?: boolean;
  sort?: number;
  url?: string;
  target?: "_blank" | "_self";
  content?: string;
  summary?: string;
  img_url: string;
}
