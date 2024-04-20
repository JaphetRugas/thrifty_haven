import { defineConfig } from 'drizzle-kit' 
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

export default defineConfig({
 schema: "./src/database/schema.ts", 
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
})