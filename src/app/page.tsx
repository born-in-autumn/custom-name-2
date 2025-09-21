import Link from "next/link";
import { BlogService } from "@/services/blog";
import Header from "@/components/Header";

export default async function Home() {
  const posts = await BlogService.getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Header />

        {/* 2. 自我介绍部分 */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Hi 这里, 我是 客儿 👋
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
          <div className="space-y-6 [&>*:not(:last-child)]:!mb-0">
            {/* 表头 */}
            <div className="flex items-center pb-3" style={{ borderBottom: '3px solid rgb(231, 234, 239.5)' }}>
              <h3 
                className="uppercase tracking-wide flex-1" 
                style={{ fontWeight: 600, color: '#373c44', fontSize: '24px', paddingLeft: '24px' }}
              >
                标题
              </h3>
              <h3 
                className="uppercase tracking-wide" 
                style={{ fontWeight: 600, color: '#373c44', minWidth: '120px', fontSize: '24px' }}
              >
                日期
              </h3>
            </div>
            
            {posts.map((post) => (
              <article key={post.id} className="group">
                <div className="flex items-center py-4 border-b border-gray-100 hover:border-gray-200 transition-colors">
                  <Link 
                    href={`/posts/${post.slug}`}
                    className="font-medium transition-colors cursor-pointer flex-1"
                    style={{ 
                      color: '#181c25',
                      fontSize: '16px',
                      textDecoration: 'underline',
                      textDecorationColor: 'rgba(24, 28, 37, 0.5)',
                      paddingLeft: '24px'
                    }}
                  >
                    {post.title}
                  </Link>
                  <time 
                    className="transition-colors"
                    style={{ 
                      color: '#181c25',
                      fontSize: '16px',
                      minWidth: '120px'
                    }}
                  >
                    {new Date(post.createdAt).toISOString().split('T')[0]}
                  </time>
                </div>
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
