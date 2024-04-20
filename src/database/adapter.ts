import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from ".";
import { sessionUserTable, userTable } from "./schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionUserTable, userTable);

export default adapter;