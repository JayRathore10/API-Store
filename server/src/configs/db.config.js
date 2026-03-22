import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};
