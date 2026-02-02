import Post from '../../models/Post.js';

// DELETE /api/posts/[slug]
export async function DELETE(req, { params }) {
  try {
    const slug = params.slug;

    if (!slug) {
      return Response.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      return Response.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/posts/[slug]
export async function GET(req, { params }) {
  try {
    const slug = params.slug;

    if (!slug) {
      return Response.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    const post = await Post.findOne({ slug }).populate('author');

    if (!post) {
      return Response.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      post
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
