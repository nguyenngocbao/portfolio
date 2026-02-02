import { useState, useEffect } from 'react';

export default function BlogIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            My Blog
          </h1>
          <p className="text-blue-100 text-xl">
            Thoughts, tutorials, and insights
          </p>
        </div>
      </div>

      {/* Main Content */}
      <PostList initialPosts={[]} categories={categories} />
    </div>
  );
}
