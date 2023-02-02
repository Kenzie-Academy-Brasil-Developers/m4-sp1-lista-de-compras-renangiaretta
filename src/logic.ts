import { lists } from './database'
import { IListRequest, IListRequiredKeys } from './interfaces'
import  { Request, Response } from 'express'


function generateId () {
    if(lists.length === 0){
        return 1
    } else {
        return lists[lists.length -1].id + 1
    }
}

const validateListData = (payload: any): IListRequest => {

    const keys: Array<string>                    = Object.keys(payload)
    const requiredKeys: Array<IListRequiredKeys> = ['listName', 'data']
    const containsAllRequired: boolean           = requiredKeys.every((key: string) => {
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
        if(typeof listData.listName === 'string'){
            lists.push(newListData)
            return response.status(201).json(newListData)
        }else{
            throw new Error('The list name must be a string.')
        }
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


const getListById = (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)
    const indexList  = lists.findIndex(el => el.id === id)
    try {
        if(indexList >= 0){
            return response.status(200).json(lists[indexList])
        } 
    } catch (error) {
        if(error instanceof Error){
            return response.status(500).json({
                message: 'Internal server error.'
            })
        }
    }
    return response.status(404).json({
        message: '404 NOT FOUND'
})
}


const deleteList = (request: Request, response: Response): Response => {
    const indexList: number = request.indexList
    try {
        if(indexList !== -1){
            lists.splice(indexList, 1)
            return response.status(200).json()
        }

        else if(indexList === -1) {
            return response.status(400).json({
                message: 'List does not exist.'
            })
        }
    } catch (error) {
        if (error instanceof Error){
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
    return response.status(404).json({
        message: '404 NOT FOUND'
    })
}

const deleteListItem = (request: Request, response: Response): Response => {
    const id: number        = parseInt(request.params.id)
    let   indexList: number = lists.findIndex(el => el.id === id)
    const name: string      = request.params.name
    if(indexList!== -1 && lists[indexList] && lists[indexList].data){
        let indexName: number = lists[indexList].data.findIndex(el => el.name === name)
        try {
            if(indexName !== -1 && indexList !== -1 && lists[indexList].data){
                lists[indexList].data.splice(indexName, 1)
                return response.status(204).json()
            }
            } catch(error) {
                if (error instanceof Error){
                    return response.status(500).json({
                        message: error.message
                    })
                }
            }
    }
    return response.status(404).json({
        message: `404 NOT FOUND`
    })
}

const updateList = (request: Request, response: Response): Response => {
     try {
        const id: number        = parseInt(request.params.id)
        let   indexList: number = lists.findIndex(el => el.id === id)
        const name: string      = request.params.name
        let   indexName: number = lists[indexList].data.findIndex(el => el.name === name)
        lists[indexList].data.splice(indexName, 1, request.body)
        return response.status(204).json()
     } catch (error){
        return response.status(404)
     }
}

export { generateId, creteNewList, getAllLists, getListById, deleteList, deleteListItem, updateList }