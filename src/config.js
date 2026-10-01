import { config } from "dotenv";
import {resolve} from 'node:path'

const env = process.env

export const NODE_ENV = env.NODE_ENV ?? "development";
config({path:resolve(`.env.${NODE_ENV ?? 'development'}`)})

export const PORT = parseInt(env.PORT?? 3000)
export const db_host = env.db_host
export const db_port = env.db_port
export const db_user = env.db_user
export const db_password = env.db_password
export const db_name = env.db_name

