import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const globalForMongoose = global as any;

export async function connectDB() {
  if (globalForMongoose.mongoose && globalForMongoose.mongooseConn) {
    console.log('Using existing database connection');
    return globalForMongoose.mongooseConn;
  }

  console.log('Connecting to MongoDB...');
  const mongooseConn = await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  globalForMongoose.mongooseConn = mongooseConn;

  return mongooseConn;
}

export async function disconnectDB() {
  if (globalForMongoose.mongooseConn) {
    await mongoose.disconnect();
    globalForMongoose.mongooseConn = null;
    console.log('Disconnected from MongoDB');
  }
}

export default mongoose;
