import posts from './posts.js';
import categories from './categories.js';
import tags from './tags.js';

export async function GET(req) {
  try {
    const { pathname } = new URL(req.url);

    // Route to API endpoints
    if (pathname.startsWith('/posts')) {
      const params = pathname.replace('/api/posts', '').split('/').filter(Boolean);
      const method = req.method;
      const handler = posts[method];
      return handler(req);
    }

    if (pathname.startsWith('/categories')) {
      const method = req.method;
      const handler = categories[method];
      return handler(req);
    }

    if (pathname.startsWith('/tags')) {
      const method = req.method;
      const handler = tags[method];
      return handler(req);
    }

    return Response.json({
      success: false,
      error: 'Route not found'
    }, { status: 404 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  return GET(req);
}
