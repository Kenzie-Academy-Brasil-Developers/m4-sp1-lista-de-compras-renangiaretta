import express, { Application } from 'express'
import { creteNewList, getAllLists, getListById, deleteList, deleteListItem } from './logic'

const app: Application = express()
app.use(express.json())

app.post('/purchaseList', creteNewList)

app.get('/purchaseList', getAllLists)

app.get(`/purchaseList/:id`, getListById)

app.delete('/purchaseList/:id', deleteList)

app.delete('/purchaseList/:id/:name', deleteListItem)

app.listen(3000, () => {
    console.log('Server is online.')
})