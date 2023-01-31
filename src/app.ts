import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(express.json())

//Interfaces
interface IListRequest {
    listName: string
    data: data
    id: number
}

interface data {
    name: string
    quantity: string
}

// interface IList extends IListRequest{
//     id: number
// }

// database
let lists: Array<IListRequest> = []

// logic
let startId: number = 0
function generateId () {
    return startId++
}
// create new list
app.post('/purchaseList', (request: Request, response: Response): Response => {

    const listData: IListRequest = request.body
    const newListData: IListRequest = {
        ...listData,
        id: generateId()
    }
    lists.push(newListData)
    return response.status(201).json(newListData)
})

// find all lists
app.get('/purchaseList', ( request: Request, response: Response ): Response => {
    // const allLists = lists
    return response.status(200).json(lists)
})

// find an list by id 
app.get(`/purchaseList/:id`, (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)
    console.log(id)
    const indexList = lists.findIndex(el => el.id === id)
    console.log(indexList)
    return response.status(200).json(lists[indexList])
})

app.listen(3000, () => {
    console.log('Server is online.')
})