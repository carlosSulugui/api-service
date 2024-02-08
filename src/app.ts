import router from "./routes";
import cors from "cors";
import express from "express";
import config from "./config";

const app = express();


const whiteList = ["http://localhost:3000", "45.228.233.159", "190.56.95.34"]


app.use(express.json());

app.use(cors({
  origin:
    (origin, callback) => {
      if (origin && whiteList.includes(origin)) return callback(null, origin)
      return callback(Error("not allowed by cors"))
    },
  credentials: true// para que se envien las cookies
}))


app.use("/img", express.static("img"))

app.use(router);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Not Found")

})
app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));