import "dotenv/config.js";
import { env } from "./src/config/env.js";
import express from "express";

const app = express();

const PORT = env.PORT;
app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log("SERVER RUN ON PORT: ", PORT);
});
