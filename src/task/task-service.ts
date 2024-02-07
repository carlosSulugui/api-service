import model from './task-model'
import {Task, Provider} from "./task-model";


const createTask = async (payload: Task) => {
  const result = await model.createTask({...payload})
  return result
}
const createProviderImg = async (id: string, img: string) => {
  const result = await model.createProviderImg(id, img)
  return result

}
const createProvider = async (payload: Provider) => {
  const result = await model.createProvider(payload)
  return result
}


const getTasks = async () => {
  const result = await model.getTasks()
  return result

}

const getProvidersAndPig = async () => {
  const result = await model.getProvidersAndPig()
  return result

}


const deleteTask = async (id : string) =>  {
  const result = await model.deleteTask(id)
  return result.message
}

export default {
  createTask,
  createProvider,
  getTasks,
  getProvidersAndPig,
  deleteTask,
  createProviderImg
}