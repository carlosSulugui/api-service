import {Router} from "express";
import service from "../task/task-controller";
import bucket from "../middleware/bucket";


const router = Router()




router.post("/", service.createTask)
router.get("/", service.getTasks)
router.post("/provider", service.createProvider)
router.get("/provider", service.getProvidersAndPig)
router.post("/storage/:id",bucket , service.createProviderImg)
router.delete("/:id", service.deleteTask)

export default router