export interface BlogData {
  imageUrl: string;
  author: string;
  id: number;
  title: string;
  slug: string; 
  content: string;
  image: string;
  date: string;
}
export function saveBlog(blog: BlogData) {
  const saved = getSavedBlogs();
  if (!saved.some((b) => b.slug === blog.slug)) {
    saved.push(blog);
    localStorage.setItem("savedBlogs", JSON.stringify(saved));
  }
}

export function unsaveBlog(slug: string) {
  const saved = getSavedBlogs();
  const updated = saved.filter((b) => b.slug !== slug);
  localStorage.setItem("savedBlogs", JSON.stringify(updated));
}

export function getSavedBlogs(): BlogData[] {
  const saved = localStorage.getItem("savedBlogs");
  return saved ? JSON.parse(saved) : [];
}

export function isBlogSaved(slug: string): boolean {
  return getSavedBlogs().some((b) => b.slug === slug);
}
