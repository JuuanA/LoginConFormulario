import { fork } from "child_process";

const getRandom = (req, res) => {
  const { cant } = req.query;
  const childProcess = fork("src/child.js");
  const quantity = cant ? cant : 100000000;

  childProcess.send(quantity);
  childProcess.on("message", (response) => {
    res.json(response);
  });
};

const getInfo = (req, res) => {
  res.json({
    pid: process.pid,
    os: process.platform,
    pathExec: process.execPath,
    nodeVersion: process.version,
    directorio: process.cwd(),
    memoriaUsada: process.memoryUsage(),
  });
};
export const randomController = { getRandom , getInfo};
