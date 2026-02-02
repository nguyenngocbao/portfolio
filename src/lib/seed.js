import connectDB from './db.js';
import Post from './models/Post.js';
import Category from './models/Category.js';
import Tag from './models/Tag.js';

async function seedData() {
  try {
    await connectDB();

    // Create default categories
    const categories = [
      { name: 'Technology', slug: 'technology', description: 'Technology news and tutorials' },
      { name: 'Tutorial', slug: 'tutorial', description: 'Step-by-step guides' },
      { name: 'Career', slug: 'career', description: 'Career advice and growth' },
      { name: 'Opinion', slug: 'opinion', description: 'Personal opinions and insights' },
      { name: 'Project', slug: 'project', description: 'Project showcases and reviews' }
    ];

    for (const category of categories) {
      await Category.findOneAndUpdate(
        { slug: category.slug },
        category,
        { upsert: true, setDefaultsOnInsert: true }
      );
    }

    console.log('✅ Default categories created');

    // Create default tags
    const tags = ['javascript', 'react', 'nextjs', 'nodejs', 'python', 'webdev', 'tutorial'];

    for (const tagName of tags) {
      await Tag.findOneAndUpdate(
        { slug: tagName.toLowerCase() },
        { name: tagName, slug: tagName.toLowerCase() },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }

    console.log('✅ Default tags created');

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
