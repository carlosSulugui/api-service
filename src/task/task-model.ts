import connection from "../configuration/connectionSQL"
import multer from "multer"
import {RowDataPacket} from "mysql2";


export type Task = {
  task_name: string,
  task_description: string,
}

export type Provider = {
  name: string,
  phone: string,
  address: string,
  id_task: string,
  animal: Animals
}

export type Animals = {
  weight: number,
  price: number,
  status: string,
}

export type Resources = {
  url: string
  animal_id: string
}


const createTask = async (payload: Task) => {
  const sql: string = `insert into tasks(task_name, task_description)
                       values ($1, $2)
                       returning * `

  const {rows: [task]} = await connection.query(sql, [payload.task_name, payload.task_description])
  return task
}


const createProvider = async (p: Provider) => {
  const sql: string = `insert into providers (name, phone, address, id_task)
                       values ($1, $2, $3, $4)
                       returning id_provider as id `
  const {rows: [provider]} = await connection.query(sql, [p.name, p.phone, p.address, p.id_task])
  console.log(provider)
  const animalSQL: string = `insert into animals (weight, price, status, id_provider)
                             values ($1, $2, $3, $4)
                             returning *`
  const {rows: [pig]} = await connection.query(animalSQL, [p.animal.weight, p.animal.price, p.animal.status, provider.id])
  return {id: provider.id, pig: pig}
}


const createProviderImg = async (id: string, img: string) => {
  const sql: string = `insert into resources (id_animal, url)
                       values ($1, $2)
                       returning * `
  const {rows: [pig]} = await connection.query(sql, [id, img])


  return pig
}


const getTasks = async () => {
  const sql: string = `select *
                       from tasks `
  const {rows} = await connection.query(sql)
  return rows
}


const getProvidersAndPig = async () => {
  const sql: string = `select p.id_provider,
                              p.name,
                              p.address,
                              p.phone,
                              jsonb_build_object('animal', a.id_animal, 'price', a.price, 'weight', a.weight, 'status',
                                                 a.status, 'resource', jsonb_agg(r.url)) as animals,
                              count(r)
                       from providers p
                                left join animals a on p.id_provider = a.id_provider
                                left join resources r on a.id_animal = r.id_animal
                       group by p.id_provider, a.id_animal
  `
  const {rows} = await connection.query(sql)

  return rows
}

const deleteTask = async (id: string) => {
  const sql: string = `delete
                       from tasks
                       where id = ?`
  const result = await connection.query(sql, [id])
  return {message: "tarea completada"}
}


const taskIsCompleted = async (id: string) => {
  const sql: string = `update tasks
                       set status = 'completed'
                       where id = ? `
  const result = await connection.query(sql, [id])
  return result
}

export default {
  createTask,
  createProvider,
  getTasks,
  getProvidersAndPig,
  deleteTask,
  createProviderImg,
}