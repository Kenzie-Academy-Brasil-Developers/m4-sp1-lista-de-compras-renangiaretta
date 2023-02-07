import { NextFunction, Request, Response } from 'express'
import { lists } from './database'
import { IDataRequiredKeys } from './interfaces'


// ---------------------------------------------------------------------------------------------
const deleteListMiddleware  = (request: Request, response: Response, next: NextFunction): Response | void => {
    const id: number        = parseInt(request.params.id)
    let   indexList: number = lists.findIndex(el => el.id === id)
    if (indexList !== -1) {
        request.indexList   = indexList
        next()
    } else {
        return response.status(404).json({
            message: '404 NOT FOUND'
        })
    }
}


// ---------------------------------------------------------------------------------------------
const validateDataMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const keys: Array<string>                    = Object.keys(request.body)
    const requiredKeys: Array<IDataRequiredKeys> = [ 'name', 'quantity' ]
    const validatedKeys: boolean                 = requiredKeys.every((key: string) => keys.includes(key))

    const { name, quantity } = request.body
    const id: number         = parseInt(request.params.id)
    
    request.validateData = {
        name,
        quantity
    }
    try {
        let indexList: number = lists.findIndex(el => el.id === id)
        if(indexList === -1){
            return response.status(404).json({
                message: `The list with id ${id} does not exist.`
            }) 
        }
        else if(!validatedKeys) {
            return response.status(400).json({
                message: `Invalid data - spected ${requiredKeys}`
            })
        }
    } catch (error) {
        if(error instanceof Error){
            return response.status(500).json({
                message: error.message
            })
        }
    }
    
    next()
}
export { deleteListMiddleware, validateDataMiddleware }