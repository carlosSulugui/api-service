import pg,  {Pool}from "pg";
import config from "../config";

const sql = new Pool({
  host: config.host,
  user: config.zuser,
  password: config.password,
  port: config.portDatabase,
  database: config.database,
})



export default sql