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
  const sql: string = `insert into tasks(task_name , task_description) values ($1, $2) returning * `

  const {rows: [task]} = await connection.query(sql, [payload.task_name, payload.task_description])
  console.log("model",task)
  return task
}


const createProvider = async ( p: Provider) => {
  const sql: string = `insert into providers (name, phone, address , id_task) values ($1, $2, $3, $4) returning id_provider as id `
  const {rows:[provider]} =await connection.query(sql, [p.name,  p.phone, p.address, p.id_task])
  console.log(provider)
  const animalSQL: string = `insert into animals (weight, price, status, id_provider)
                       values ($1, $2, $3, $4) returning *`
  const {rows:[pig]} = await connection.query(animalSQL, [p.animal.weight, p.animal.price, p.animal.status, provider.id])
  return {id: provider.id ,pig: pig}
}


const createProviderImg = async (id: string, img: string) => {
  const sql: string = `insert into resources (id_animal, url) values ($1, $2) returning * `
  const {rows:[pig]} = await connection.query(sql, [id, img])


  return pig
}



const getTasks = async () => {
  // const sql: string = `select *
  //                      from tasks `
  // const rows = await connection.query(sql)
  //
  // if (rows.length === 0) return {error: "no hay tareas"}
  // const _tasks = rows
  // return {
  //   tasks:
  //     _tasks.map((task: any) => {
  //       return {
  //         name: task.name,
  //         address: task.address,
  //         status: task.status,
  //         id: task.id,
  //         created_at: task.created_at
  //
  //
  //       }
  //     })
  // }
}


const getProvidersAndPig = async () => {
  // const sql: string = `select *
  //                      from providers `;
  //
  // const [rows] = await connection.query(sql) as any[];
  // if (rows.length === 0) return {error: "no hay proveedores"};
  //
  // return {
  //   providers: rows.map((provider: any) => {
  //     const {photo} = provider;
  //     const buffer = Buffer.from(photo, 'hex');
  //     const img = buffer.toString('utf8'); // Convertir el buffer a una cadena UTF
  //
  //     return {
  //       name: provider.name,
  //       phone: provider.phone,
  //       address: provider.address,
  //       price: provider.price,
  //       weight: provider.weight,
  //       status: provider.status,
  //       photo: img
  //     };
  //   })
  // };
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