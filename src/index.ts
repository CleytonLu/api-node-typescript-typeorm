import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

const PORT = process.env.PORT;

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(routes)

  app.listen(PORT, (error) => {
    if (error !== null)
      return console.log(`application run in: localhost://${PORT}`);

    console.log("Não foi póssível se conectar");
  });
});
