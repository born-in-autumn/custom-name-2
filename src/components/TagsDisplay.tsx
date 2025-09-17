interface TagsDisplayProps {
  tags?: string;
}

export default function TagsDisplay({ tags }: TagsDisplayProps) {
  if (!tags || tags.trim() === '') {
    return null;
  }

  // 分割标签，支持逗号和顿号
  const tagList = tags
    .split(/[,，]/)
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  if (tagList.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tagList.map((tag, index) => (
        <span
          key={index}
          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
