import Post from '../models/Post.js';

// GET /api/posts
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'published';

    const query = { status };
    if (category) {
      query['category.slug'] = category;
    }

    const posts = await Post.find(query)
      .populate('author')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Post.countDocuments(query);

    return Response.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/posts
export async function POST(req) {
  try {
    const data = await req.json();

    // Validate data
    if (!data.title || !data.content || !data.author || !data.category) {
      return Response.json(
        { success: false, error: 'Title, content, author, and category are required' },
        { status: 400 }
      );
    }

    const post = await Post.create(data);

    return Response.json({
      success: true,
      post
    }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
