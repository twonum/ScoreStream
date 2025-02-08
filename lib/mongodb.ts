/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URI!; // assert that this value is not undefined
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached: {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
} = (global as any).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  (global as any).mongoose = cached;
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // You can add additional options here if necessary
    };
    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => mongooseInstance.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
