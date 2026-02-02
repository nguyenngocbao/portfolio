import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  postCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Pre-save middleware
CategorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.generateSlug(this.name);
  }
  next();
});

// Instance methods
CategorySchema.methods.generateSlug = function(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

CategorySchema.methods.incrementPostCount = function() {
  this.postCount = (this.postCount || 0) + 1;
};

CategorySchema.methods.decrementPostCount = function() {
  if (this.postCount > 0) {
    this.postCount--;
  }
};

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
