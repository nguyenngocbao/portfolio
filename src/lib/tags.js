import Tag from '../models/Tag.js';

// GET /api/tags
export async function GET(req) {
  try {
    const tags = await Tag.find()
      .sort({ name: 1 })
      .limit(50);

    return Response.json({
      success: true,
      tags
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/tags (Admin only)
export async function POST(req) {
  try {
    const data = await req.json();

    // Validate
    if (!data.name) {
      return Response.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const tag = await Tag.create(data);

    return Response.json({
      success: true,
      tag
    }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
