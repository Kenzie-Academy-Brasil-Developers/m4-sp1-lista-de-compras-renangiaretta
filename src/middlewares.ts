import { NextFunction, Request, Response } from 'express'
import { lists } from './database'
import { IDataRequiredKeys, IListRequiredKeys } from './interfaces'

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
const validateDataMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const keys: Array<string>                    = Object.keys(request.body)
    const requiredKeys: Array<IDataRequiredKeys> = [ 'name', 'quantity' ]
    const validatedKeys: boolean                 = requiredKeys.every((key: string) => keys.includes(key))

    const { name, quantity } = request.body

    request.validateData = {
        name,
        quantity
    }
    if(!validatedKeys) {
        return response.status(400).json({
            message: `Invalid data - spected ${requiredKeys}`
        })
    }
    next()
}
export { deleteListMiddleware, validateDataMiddleware }