import "dotenv/config";
import express from "express";
import router from "./routes";
import connection from "./database/connection";

export default class App {
  protected app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.start();
  }

  protected config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use("/api", router);
  }

  protected async start(delay: number = 5000) {
    const port = process.env.PORT || 3000;

    await new Promise((resolve) => setTimeout(resolve, delay));
    await connection
      .initialize()
      .then(() => {
        this.app.listen(port, () => {
          console.log(`running on port ${port}`);
        });
      })
      .catch((e) => console.log);
  }
}
