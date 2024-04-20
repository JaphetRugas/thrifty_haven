import pg from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import * as schema from "./schema"

dotenv.config({ path: "../../.env.local" });

const pool = new pg.Pool({
    connectionString: process.env.DB_URL!,
});
const db = drizzle(pool, {schema}) as NodePgDatabase<typeof schema>;;

export default db;