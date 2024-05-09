// Import the required modules
import { type Db, MongoClient } from 'mongodb';

// Define the connection URL and the database name
const url = process.env.MONGODB_URI ?? "";
const dbName = process.env.MONGODB_DB_NAME ?? "";

// Create a global variable to store the database connection
let cachedDb: Db | null = null;

// Create a helper function that connects to the database and returns the database object
export async function connectToDatabase() {
  // Check if the database connection is cached
  if (cachedDb) {
    // Return the cached connection
    return cachedDb;
  }

  // Create a new connection to the database
  const client = await MongoClient.connect(url, {});

  // Select the database
  const db = client.db(dbName);

  // Cache the database connection
  cachedDb = db;

  // Return the database object
  return db;
}