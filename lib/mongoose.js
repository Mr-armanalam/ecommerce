import mongoose from "mongoose";

export async function mongooseConnect () {
  const uri = process.env.MONGODB_URI;
  if (mongoose.connection.readyState === 1) {
    return await mongoose.connection.asPromise();
  } else {
    return await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,    
    });
  }
}