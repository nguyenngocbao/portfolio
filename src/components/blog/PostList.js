'use client';

import { useState, useEffect } from 'react';

export default function PostList({ initialPosts, categories }) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const url = new URL('/api/posts', window.location.origin);
        if (categoryFilter) {
          url.searchParams.set('category', categoryFilter);
        }
        url.searchParams.set('page', currentPage);
        url.searchParams.set('limit', '10');

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

    fetchPosts();
  }, [categoryFilter, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Blog Posts
            </h1>
            <p className="text-gray-600">
              Latest insights, tutorials, and thoughts
            </p>
          </div>

          {/* Loading State */}
          {loading && posts.length === 0 && (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading posts...</p>
            </div>
          )}

          {/* Post Grid */}
          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  disabled={page === currentPage}
                  className={`px-4 py-2 rounded-lg ${
                    page === currentPage
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

        {/* Sidebar */}
        <div className="lg:w-1/4">
          <BlogSidebar categories={categories} />
        </div>
      </div>
    </div>
  );
}
