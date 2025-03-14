import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";

const port = Number(process.env.DB_PORT) as number | undefined

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
