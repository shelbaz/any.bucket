// Import the required modules
import { MongoClient } from "mongodb";

// Define the connection URL and the database name
const url = process.env.MONGODB_URI ?? "";
const dbName = process.env.MONGODB_DB_NAME ?? "";

// Replace with your MongoDB connection string
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(url, options);
    this.clientPromise = this.client.connect();

    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable to preserve the value
      // across module reloads caused by HMR (Hot Module Replacement).
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}

const clientPromise = Singleton.instance;

// Export a module-scoped MongoClient promise.
// By doing this in a separate module,
// the client can be shared across functions.
export default clientPromise;

// Create a helper function that connects to the database and returns the database object
export async function connectToDatabase() {
  // Check if the database connection is cached
  const client = await clientPromise;

  // Select the database
  const db = client.db(dbName);

  // Return the database object
  return db;
}
