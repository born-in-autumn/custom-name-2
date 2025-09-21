import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Header />

        {/* 内容部分 */}
        <main>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Contact</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              这是联系页面，稍后会添加更多内容。
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
