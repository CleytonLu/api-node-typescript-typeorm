import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const port = Number(process.env.DB_PORT) as number | undefined;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST /* || "localhost" */,
  port: port /* || 3306 */,
  username: process.env.DB_USERNAME /* || "root" */,
  password: process.env.DB_PASS /* || "14102023" */,
  database: process.env.DB_NAME /* || "videos" */,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
