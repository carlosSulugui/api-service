import type {Request, Response} from "express";
import middlewareforphto from "../middleware/bucket";
import service from "../task/task-service";

const createTask = async (req: Request, res: Response) => {
  const {task_name, task_description} = req.body
  try {
    const result = await service.createTask({task_name, task_description})
    return res.status(200).json({success: result})
  } catch (e) {
    return res.status(500).json({error: e})
  }
}


const createProviderImg = async (req: Request, res: Response) => {
  const {id} = req.params
  const file = req.file?.filename
  const url = `/img/${id}/${file}`
  try {

    console.log(url)
    const result = await service.createProviderImg(id, url)
    console.log("controller",result)
    return res.status(200).json(result)
  } catch (e) {
    console.log(e)
    return res.status(500).json({error: e})
  }
}

const createProvider = async (req: Request, res: Response) => {
  try {
    const result = await service.createProvider(req.body)
    return res.status(200).json(result)

  } catch (e) {
    console.log(e)
    return res.status(500).json({error: e})
  }
}


const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await service.getTasks()
    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).json({error: e})
  }
}

const getProvidersAndPig = async (req: Request, res: Response) => {
  try {
    const result = await service.getProvidersAndPig()
    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).json({error: e})
  }
}

const deleteTask = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const result = await service.deleteTask(id)
    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).json({error: e})
  }

}

export default {
  createTask,
  createProvider,
  getTasks,
  getProvidersAndPig,
  deleteTask,
  createProviderImg
}