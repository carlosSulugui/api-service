import service from "../task/task-controller";
import bucket from "../middleware/bucket";
import {Router} from "express";

const router = Router()

router.post("/", service.createProvider)
router.get("/", service.getProvidersAndPig)
router.post("/storage/:id", bucket, service.createProviderImg)

export default router