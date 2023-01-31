import { lists } from "./database"
import { IListRequest, listRequiredKeys } from "./interfaces"
import  { Request, Response } from 'express'

let startId: number = 1
function generateId () {
    return startId++
}

const validateListData = (payload: any): IListRequest => {

    const keys: Array<string>                   = Object.keys(payload)
    const requiredKeys: Array<listRequiredKeys> = ['listName', 'data']
    
    const containsAllRequired: boolean = requiredKeys.every((key: string) => {
        console.log(keys)
       return keys.includes(key)
    })
    if(!containsAllRequired || keys.length > 2){
        throw new Error(`Required keys are: ${requiredKeys}. Nothing else!`)
    }
    return payload
}

const creteNewList = (request: Request, response: Response): Response => {

    try {
        const listData: IListRequest    = validateListData(request.body)
        const newListData: IListRequest = {
            ...listData,
            id: generateId()
        }
        lists.push(newListData)
        return response.status(201).json(newListData)
    } catch (error) {
        if(error instanceof Error){
            return response.status(400).json({
                message: error.message
            })
        }
        return response.status(500).json({
            message: 'Internal server error.'
        })
    }
}

const getAllLists = ( request: Request, response: Response ): Response => {
    try {
        return response.status(200).json(lists)
        
    } catch (error) {
        return response.status(404).json({
            message: '404 NOT FOUND'
        })
    }
}

const getListById = (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)
    console.log(id)
    const indexList = lists.findIndex(el => el.id === id)
    if(indexList >= 0){
        console.log(indexList)
        return response.status(200).json(lists[indexList])
    } else {
        return response.status(200).json({
            message: '404 NOT FOUND'
        })
    }
}

const deleteList = (request: Request, response: Response): Response => {
    const id: number        = parseInt(request.params.id)
    let   indexList: number = lists.findIndex(el => el.id === id)
    if(indexList === id){
        lists.splice(indexList, 1)
        console.log(lists[indexList].data)
        return response.status(204)
    } else {
        return response.status(404).json({
            message: '404 NOT FOUND'
        })
    }
}

const deleteListItem = (request: Request, response: Response): Response => {

    try {
        const id: number        = parseInt(request.params.id)
        let   indexList: number = lists.findIndex(el => el.id === id)
        const name: string      = request.params.name
        let   indexName: number = lists[indexList].data.findIndex(el => el.name === name)
    if(indexName >= 0 && indexList === id){
            lists[indexList].data.splice(indexName, 1)
        return response.status(204)
    }
    else {
        return response.status(404).json({
            message: `${name} does not belong to the list.`
        })
    }
    } catch (error) {
        return response.status(500).json({
            message: `${error}`
        })
    }
}


export { generateId, creteNewList, getAllLists, getListById, deleteList, deleteListItem }