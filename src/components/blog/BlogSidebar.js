'use client';

import { useState, useEffect } from 'react';

export default function BlogSidebar({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>

      <ul className="space-y-2 mb-8">
        <li>
          <button
            onClick={() => handleCategoryClick('')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === ''
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
        </li>
        {categories?.map((category) => (
          <li key={category._id}>
            <button
              onClick={() => handleCategoryClick(category.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Search Box */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Search</h3>
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Newsletter</h3>
        <p className="text-sm text-gray-600 mb-3">
          Get the latest posts delivered to your inbox
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
}
