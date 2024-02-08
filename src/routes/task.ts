import {Router} from "express";
import service from "../task/task-controller";


const router = Router()




router.post("/", service.createTask)
router.get("/", service.getTasks)
router.delete("/:id", service.deleteTask)

export default router