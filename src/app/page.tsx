import Link from "next/link";
import { BlogService } from "@/services/blog";

export default async function Home() {
  const posts = await BlogService.getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">我的博客</h1>
              <p className="text-xl text-gray-600">分享我的想法和经历</p>
            </div>
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              管理后台
            </Link>
          </div>
        </header>

        <main>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-8">
                <Link 
                  href={`/posts/${post.slug}`}
                  className="group block"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-3">
                    {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                  <p className="text-gray-500 group-hover:text-gray-700 transition-colors">
                    点击阅读更多 →
                  </p>
                </Link>
              </article>
            ))}
        </div>
      </main>
      </div>
    </div>
  );
}
