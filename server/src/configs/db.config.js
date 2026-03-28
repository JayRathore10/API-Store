import mongoose from 'mongoose';
import { MONGODB_URI } from './env.config';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log(`DB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};
