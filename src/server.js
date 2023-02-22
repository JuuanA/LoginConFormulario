import MongoStore from "connect-mongo";
import express, { json, urlencoded } from "express";
import session from "express-session";
import expHbs from "express-handlebars";
import router from "./routes/index.js";
import { configObject } from "./config/index.js";

const app = express();

/* const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}; */ 

app.use(json());
app.use('/', router)
app.use(urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    rolling: true,
    secret: "coderhouse",
    store: new MongoStore({
      mongoUrl: "mongodb://127.0.0.1:27017/test"
    }),
    cookie: {
      maxAge: 10000, // Cuanto queremos que dure la sesion
    },
  })
);

app.engine(".hbs", expHbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

app.listen('3000', () => {
    console.log("server listening port 3000");
})

