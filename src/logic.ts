import { lists } from "./database"
import { IListRequest } from "./interfaces"
import  { Request, Response } from 'express'

let startId: number = 0
function generateId () {
    return startId++
}
const creteNewList = (request: Request, response: Response): Response => {

    try {
        const listData: IListRequest = request.body
        const newListData: IListRequest = {
            ...listData,
            id: generateId()
        }
        lists.push(newListData)
        return response.status(201).json(newListData)
    } catch (error) {
        return response.status(404).json('List not found.')
    }
}

const getAllLists = ( request: Request, response: Response ): Response => {
    return response.status(200).json(lists)
}

const getListById = (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)
    console.log(id)
    const indexList = lists.findIndex(el => el.id === id)
    if(indexList >= 0){
        console.log(indexList)
        return response.status(200).json(lists[indexList])
    } else {
        return response.status(200).json('List not found.')
    }
}

const deleteList = (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)
    let indexList: number = lists.findIndex(el => el.id === id)
    if(indexList === id){
        lists.splice(indexList, 1)
        console.log(lists[indexList].data)
        return response.sendStatus(204)
    } else {
        return response.status(404).json({'message': 'List not found.'})
    }
}

const deleteListItem = (request: Request, response: Response): Response => {

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
        return response.status(404).json({'message': `${name} does not belong to the list.`})
    }
    } catch (error) {
        return response.status(500).json({'message': `${error}`})
    }
}


export { generateId, creteNewList, getAllLists, getListById, deleteList, deleteListItem }