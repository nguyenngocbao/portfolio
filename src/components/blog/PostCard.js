import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
    >
      {/* Featured Image */}
      {post.featuredImage && post.featuredImage.url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        {post.category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
              {post.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {post.author?.name && (
              <span>{post.author.name}</span>
            )}
            <span>•</span>
            <time>{new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</time>
          </div>

          {/* Read Time */}
          {post.readTime && (
            <span>{post.readTime} min read</span>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
