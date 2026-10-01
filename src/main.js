import express from 'express'
import { bootStrapDB } from './DB/connection.db.js'
import { PORT } from './config.js'
import './DB/models/setup.models.js';

const app = express()

bootStrapDB(app,PORT)



app.get('/', (req, res) => res.send('Hello World!'))
