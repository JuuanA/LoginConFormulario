import MongoStore from "connect-mongo";
import express, { json, urlencoded } from "express";
import session from "express-session";
import expHbs from "express-handlebars";
import { configObject } from "./config/index.js";

const app = express();

/* const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
 */

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    rolling: true,
    secret: "coderhouse",
    store: new MongoStore({
      mongoUrl: configObject.mongoUrl, /* mongoOptions */
    }),
    Cookie: {
      maxAge: 3000,
    },
  })
);

app.engine(".hbs", expHbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

app.listen(3000, () => {
  console.log("Escuchando server 3000");
});
