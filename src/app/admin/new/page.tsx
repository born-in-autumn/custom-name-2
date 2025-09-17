'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import MarkdownEditor from '@/components/MarkdownEditor';

// 动态导入预览组件
const MarkdownPreview = dynamic(() => import('@/components/MarkdownPreview'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">加载预览中...</div>
});

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // 自动生成 slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 移除特殊字符
      .replace(/\s+/g, '-') // 空格替换为连字符
      .replace(/-+/g, '-') // 多个连字符替换为单个
      .trim();
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError('请填写所有必填字段');
      return;
    }

    setIsPublishing(true);
    setError('');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          content: content.trim(),
          tags: tags.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '发布失败');
      }

      const post = await response.json();
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        router.push(`/posts/${post.slug}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发布失败，请重试');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">写新文章</h1>
        <p className="mt-2 text-sm text-gray-700">
          使用 Markdown 格式编写你的文章
        </p>
      </div>

      {showSuccessAlert && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">文章发布成功！正在跳转到文章页面...</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-800">{error}</div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">文章信息</h2>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {showPreview ? '编辑模式' : '预览模式'}
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing || !title.trim() || !slug.trim() || !content.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? '发布中...' : '发布文章'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                文章标题 *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入文章标题"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                URL 路径 *
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="url-path-for-your-post"
              />
              <p className="mt-1 text-sm text-gray-500">
                文章访问地址：/posts/{slug || 'your-slug'}
              </p>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                标签
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="生活，技术，编程"
              />
              <p className="mt-1 text-sm text-gray-500">
                使用逗号或顿号分隔多个标签，例如：生活，技术，编程
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                文章内容 *
              </label>
              {showPreview ? (
                <div className="border border-gray-300 rounded-md p-4 min-h-[500px]">
                  <MarkdownPreview content={content} />
                </div>
              ) : (
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  placeholder="开始写你的文章..."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
