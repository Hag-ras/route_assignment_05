import express from 'express'
import { bootStrapDB } from './DB/connection.db.js'
import { PORT } from './config.js'
import './DB/models/setup.models.js';
import { commentController, userController, postController } from './modules/index.js';
import { globalErrorHandling } from './middleware/error.middleware.js';

const app = express()

bootStrapDB(app,PORT)

app.use(express.json())
app.use('/users',userController)
app.use('/comments',commentController)
app.use('/posts',postController)

app.use((req,res,next)=>{
    return res.status(404).json({message: "Not Found!"})
})
app.use(globalErrorHandling)

