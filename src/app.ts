import express, { Application } from 'express'
import { creteNewList, getAllLists, getListById, deleteList, deleteListItem, updateList } from './logic'
import { deleteListMiddleware, validateDataMiddleware } from './middlewares'

const app: Application = express()
app.use(express.json())

app.post('/purchaseList', creteNewList)

app.get('/purchaseList', getAllLists)

app.get(`/purchaseList/:id`, getListById)

app.delete('/purchaseList/:id', deleteListMiddleware, deleteList)

app.delete('/purchaseList/:id/:name', deleteListItem)

app.patch('/purchaseList/:id/:name', validateDataMiddleware, updateList)

app.listen(3000, () => {
    console.log('Server is online.')
})