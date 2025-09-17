'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';

// 使用 react-markdown 进行预览
const ReactMarkdown = dynamic(() => import('react-markdown'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">加载预览中...</div>
});

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
        暂无内容，开始编写文章吧！
      </div>
    );
  }

  return (
    <div className="w-full prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
