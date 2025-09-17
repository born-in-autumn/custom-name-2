import Link from "next/link";
import { BlogService } from "@/services/blog";

export default async function Home() {
  const posts = await BlogService.getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 1. Header 部分 */}
        <header className="mb-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 
                className="text-3xl font-bold transition-colors hover:underline cursor-pointer" 
                style={{ color: '#655cd6' }}
              >
                张三
              </h1>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/contact"
                className="font-medium transition-colors hover:underline"
                style={{ color: '#655cd6' }}
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="font-medium transition-colors hover:underline"
                style={{ color: '#655cd6' }}
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        {/* 2. 自我介绍部分 */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Hi there, I&apos;m 张三 👋
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to my website, where I write about technology, programming, 
              web development, and more! I share my thoughts, experiences, and 
              insights on various topics that interest me.
            </p>
          </div>
        </section>

        {/* 3. 文章列表部分 */}
        <main>
          <div className="space-y-6">
            {/* 表头 */}
            <div className="flex justify-between items-center" style={{ borderBottom: '3px solid rgb(231, 234, 239.5)' }}>
              <h3 
                className="text-sm uppercase tracking-wide" 
                style={{ fontWeight: 600, color: '#373c44' }}
              >
                Title
              </h3>
              <h3 
                className="text-sm uppercase tracking-wide" 
                style={{ fontWeight: 600, color: '#373c44' }}
              >
                Date
              </h3>
            </div>
            
            {posts.map((post) => (
              <article key={post.id} className="group">
                <Link 
                  href={`/posts/${post.slug}`}
                  className="flex justify-between items-center py-4 border-b border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <h3 
                    className="font-medium transition-colors cursor-pointer"
                    style={{ 
                      color: '#181c25',
                      fontSize: '24px',
                      textDecoration: 'underline',
                      textDecorationColor: 'rgba(24, 28, 37, 0.5)'
                    }}
                  >
                    {post.title}
                  </h3>
                  <time 
                    className="transition-colors"
                    style={{ 
                      color: '#181c25',
                      fontSize: '24px'
                    }}
                  >
                    {new Date(post.createdAt).toISOString().split('T')[0]}
                  </time>
                </Link>
              </article>
            ))}
            
            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">暂无文章</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
