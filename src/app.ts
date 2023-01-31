import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(express.json())

//Interfaces
interface IListRequest {
    listName: string
    data: data[]
    id: number | undefined
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

    try {
        const listData: IListRequest = request.body
        const newListData: IListRequest = {
            ...listData,
            id: generateId()
        }
        lists.push(newListData)
        return response.status(201).json(newListData)
    } catch (error) {
        return response.status(404).json('Lista inexistente')
    }
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
    if(indexList >= 0){
        console.log(indexList)
        return response.status(200).json(lists[indexList])
    } else {
        return response.status(200).json('A lista não existe')
    }
})

// delete list
app.delete('/purchaseList/:id', (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)
    let indexList: number = lists.findIndex(el => el.id === id)
    if(indexList === id){
        lists.splice(indexList, 1)
        console.log(lists[indexList].data)
        return response.sendStatus(204)
    } else {
        return response.status(404).json({'message': 'Lista não encontrada'})
    }
})

app.delete('/purchaseList/:id/:name', (request: Request, response: Response): Response => {

    try {
        const id: number = parseInt(request.params.id)
    let indexList: number = lists.findIndex(el => el.id === id)
    const name: string = request.params.name
    let indexName: number = lists[indexList].data.findIndex(el => el.name === name)
    if(indexName >= 0 && indexList === id){
            lists[indexList].data.splice(indexName, 1)
        return response.sendStatus(204)
    }
    else {
        return response.status(404).json({'message': `${name} não está na lista`})
    }
    } catch (error) {
        return response.status(500).json({'message': `${error}`})
    }
})

app.listen(3000, () => {
    console.log('Server is online.')
})