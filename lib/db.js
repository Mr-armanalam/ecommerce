import { MongoClient } from "mongodb";

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  throw new Error(
    'Invalid/Missing environment variable: "NEXT_PUBLIC_MONGODB_URI"'
  );
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

export default client;
