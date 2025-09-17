export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogList {
  posts: BlogPost[];
}
