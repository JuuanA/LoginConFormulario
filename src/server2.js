import MongoStore from "connect-mongo";
import express, { json, urlencoded } from "express";
import session from "express-session";
import expHbs from "express-handlebars";
import router from "./routes/index.js";
import { configObject } from "./config/index.js";
import os from "os";
import cluster from "cluster";
import yargs from "yargs";

const app = express();

/* const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}; */

const params = yargs(process.argv.slice(2))
  .alias({
    p: "port",
    m: "mode",
  })
  .default({
    mode: "FORK",
    port: 8080,
  }).argv;
const cpus = os.cpus();

if (cluster.isPrimary && params.mode.toUpperCase() === "CLUSTER") {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} murio`);
    cluster.fork();
  });
} else {
  app.use(json());

  app.use(urlencoded({ extended: true }));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      rolling: true,
      secret: "coderhouse",
      store: new MongoStore({
        mongoUrl: "mongodb://127.0.0.1:27017/test",
      }),
      cookie: {
        maxAge: 10000000, // Cuanto queremos que dure la sesion
      },
    })
  );

  app.engine(".hbs", expHbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
  app.set("view engine", ".hbs");

  app.use("/api/randoms", router);

  app.listen(params.port, () => {
    console.log(`Escuchando puerto ${params.port}`);
  });
}

/* app.use(json());

app.use(urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    rolling: true,
    secret: "coderhouse",
    store: new MongoStore({
      mongoUrl: "mongodb://127.0.0.1:27017/test",
    }),
    cookie: {
      maxAge: 10000000, // Cuanto queremos que dure la sesion
    },
  })
);

app.engine(".hbs", expHbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

app.use("/", router);

app.listen("3000", () => {
  console.log("server listening port 3000");
});
 */
