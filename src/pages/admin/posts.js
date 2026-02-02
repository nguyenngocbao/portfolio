'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function PostsManager() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [page, selectedStatus]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/posts', window.location.origin);
      if (selectedStatus) {
        url.searchParams.set('status', selectedStatus);
      }
      url.searchParams.set('page', page);
      url.searchParams.set('limit', '20');

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setPosts(data.posts);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.success) {
        alert('Post deleted successfully');
        fetchPosts();
      } else {
        alert('Failed to delete post: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
        <a
          href="/admin/post/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Post
        </a>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && posts.length === 0 && (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : post.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {post.status.toUpperCase()}
                </span>
                <div className="flex gap-2">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    View
                  </a>
                  <a
                    href={`/admin/post/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </a>
                </div>
              </div>

              {post.featuredImage?.url && (
                <div className="aspect-video overflow-hidden mb-3 rounded-lg">
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {post.excerpt || post.content.substring(0, 150)}...
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.readTime} min read</span>
              </div>

              <button
                onClick={() => handleDelete(post.slug)}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* No Posts */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts found</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              disabled={page === page}
              className={`px-4 py-2 rounded-lg ${
                page === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
