import type {Request, Response, NextFunction} from 'express'
import * as crypto from "crypto";
import fs from 'fs'
import multer, {diskStorage} from 'multer'
import path from 'path'


const roodDir = process.cwd()



const bucket = (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params

  if (!id) {
    return res.status(400).json({error: "id is required"})
  }

  const storage = diskStorage({
    destination(req: Request, file: Express.Multer.File, cd: any) {
      const animalDir = path.join(roodDir, 'img', id)
      if (!fs.existsSync(animalDir)) {
        fs.mkdirSync(animalDir, {recursive: true})
      }
      cd(null, animalDir)
    },

    filename(req: Request, file: Express.Multer.File, cd: any) {
      const random = crypto.randomUUID()
      const ext = file.originalname.split('.').pop()
      const filename = `${random}.${ext}`
      return cd(null, filename)
    }

  })

  const upload = multer({storage})
  upload.single('photo')(req, res, next)
}


export default bucket