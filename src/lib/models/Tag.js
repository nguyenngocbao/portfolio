import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
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
TagSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.generateSlug(this.name);
  }
  next();
});

// Instance methods
TagSchema.methods.generateSlug = function(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

TagSchema.methods.incrementPostCount = function() {
  this.postCount = (this.postCount || 0) + 1;
};

TagSchema.methods.decrementPostCount = function() {
  if (this.postCount > 0) {
    this.postCount--;
  }
};

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);
