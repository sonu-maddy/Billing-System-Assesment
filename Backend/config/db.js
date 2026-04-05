import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();


export const pool = new Pool({
  user: process.env.database_user || "postgres",
  host: process.env.database_host || "localhost",
  database: process.env.database_name || "LogiEdge Billing System",
  password: process.env.database_password || "sonu@12345",
  port: process.env.database_port || 5432,
});