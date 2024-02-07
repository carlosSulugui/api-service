import connection from "../src/configuration/connectionSQL"
import router from "./routes";
import cors from "cors";
import express from "express";
import config from "./config";
const app = express();




const whiteList = ["http://localhost:4000", "http://localhost:4000", "http://192.168.0.106:4000"]


app.use(express.json());


//TODO 1: coregir el log de la base de datos





app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) return callback(null, origin)
    return callback(Error("not allowed by cors"))
  },
  credentials: true// para que se envien las cookies
}))

// connection.pool.getConnection((err, connection) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("database connected")
//   }
//
// })

app.use("/img", express.static("img"))

app.use(router);

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`) );