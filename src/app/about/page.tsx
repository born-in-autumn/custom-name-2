import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header 部分 */}
        <header className="mb-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">张三</h1>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="text-gray-900 font-medium"
              >
                About
              </Link>
              <Link
                href="/admin"
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                管理后台
              </Link>
            </nav>
          </div>
        </header>

        {/* 内容部分 */}
        <main>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">About</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              这是关于页面，稍后会添加更多内容。
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
