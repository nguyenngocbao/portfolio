import Category from '../models/Category.js';

// GET /api/categories
export async function GET(req) {
  try {
    const categories = await Category.find()
      .sort({ name: 1 });

    return Response.json({
      success: true,
      categories
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/categories (Admin only)
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

    const category = await Category.create(data);

    return Response.json({
      success: true,
      category
    }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
