import fs from "fs";
import express from "express";

const router = express.Router()



const removeExtension = (filename:string) => {
  return filename.replace(".ts", "").replace(".js", "")
}

fs.readdirSync(`${__dirname}`).filter(file => {
  const newName = removeExtension(file)
  if (newName !== "index") {
    import (`./${file}`)
      .then((__router) => {
        router.use(`/api/${newName}`, __router.default)
      })
  }
})
export default router