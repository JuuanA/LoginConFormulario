import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const users = [];

const serverLogin = (req, res) => {
  return res.sendFile(join(__dirname, "../../views/login.html"));
};

const login = (req, res) => {
  const { username } = req.body;

  if (!users.includes(username)) {
    return res.send("Credenciales Invalidas");
  }

  req.session.user = username;
  res.redirect("/welcome");
};

const serverRegister = (req, res) => {
  res.sendFile(join(__dirname, "../../views/register.html"));
};

const register = (req, res) => {
  const { username } = req.body;

  if (users.includes(username)) {
    return res.send("Nombre en uso");
  }

  users.push(username);
  res.redirect("/login");
};

const logout = (req, res) => {
  const username = req.session.user
  req.session.destroy();
  res.render("logout", {username})
};

const serverWelcome = (req , res) => {
  const username = req.session.user;
  res.render("welcome", {username})
}


export const authController = { serverLogin, login, serverRegister, register ,  logout , serverWelcome};
