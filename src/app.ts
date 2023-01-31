import express, { Application } from 'express'
import { consoleLogMiddleware, consoleLogTestMiddleware, createWorkOrder, listWorkOrder } from './logic'


const app: Application = express()
app.use(express.json())

app.post('/work-order',consoleLogMiddleware, consoleLogTestMiddleware, createWorkOrder)
app.get('/work-order', listWorkOrder)


app.listen(3000, () =>{
    console.log('Server is online.')
})