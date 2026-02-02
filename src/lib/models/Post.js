import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  featuredImage: {
    url: String,
    alt: String
  },
  author: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
  },
  category: {
    name: { type: String, required: true },
    slug: { type: String, required: true }
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Pre-save middleware
PostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.generateSlug(this.title);
  }
  next();
});

// Instance methods
PostSchema.methods.generateSlug = function(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

PostSchema.methods.isPublished = function() {
  return this.status === 'published';
};

PostSchema.methods.getPublishedAt = function() {
  return this.isPublished() ? this.updatedAt : null;
};

// Virtuals
PostSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`;
});

PostSchema.virtual('shortContent').get(function() {
  return this.excerpt || this.content.substring(0, 150) + '...';
});

PostSchema.virtual('readTime').get(function() {
  const wordsPerMinute = 200;
  const words = this.content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
