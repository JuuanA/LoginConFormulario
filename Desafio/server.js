import express from "express";
import logger from "./logger.js";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url });

  next();
});

app.use("/api", router);

app.use((req, res, next) => {
  logger.warn({ method: req.method, url: req.url });

  res.status(404).send("Not found :(");
});

app.listen(3000, () => {
  logger.info("Server listening port: "port");
});