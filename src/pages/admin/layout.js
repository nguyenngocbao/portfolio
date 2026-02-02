import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, mounted, router]);

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-gray-900 text-white min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

            <nav className="space-y-2">
              <Link
                href="/admin"
                className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                    Dashboard
              </Link>

              <Link
                href="/admin/posts"
                className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Posts
              </Link>

              <Link
                href="/admin/categories"
                className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Categories
              </Link>

              <Link
                href="/admin/tags"
                className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Tags
              </Link>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
