import { IWorkOrder, IWorkOrderRequest, WorkOrderRequiredKeys } from "./interfaces"
import { ids, orders } from "./database"
import { NextFunction, Request, Response } from "express"

const validateOrder = (payload: any):IWorkOrderRequest => {
    const keys: Array<string>                        = Object.keys(payload)
    const requiredKeys: Array<WorkOrderRequiredKeys> = ['description', 'mechanical', 'client', 'price']

    const containsAllRequired: boolean = requiredKeys.every((key: string) => {
        console.log(key)
        return keys.includes(key)
    })
    if(!containsAllRequired){
        throw new Error (`Required keys are: ${requiredKeys}`)
    }
    return payload
}

const consoleLogMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    console.log('Entrou no primeiro middleware')
    return next()
}

const consoleLogTestMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    console.log(request)
    if(request.body.status === undefined){
        return response.status(400).json({
            message: 'Status is undefined'
        })
    }
    return next()
}


const createWorkOrder = (request: Request, response: Response): Response => {

    try {
    const orderData: IWorkOrderRequest = validateOrder(request.body)
    const id:number                    = Math.floor(Math.random()*1000)
    const idExists                     = ids.find(el => el === id)

    if(idExists) {
        return response.status(409).json({
            message: 'is already exists, try again.'
        })
    }

    const newOrderData: IWorkOrder = {
        id       : id,
        startDate: new Date(),
        endDate  : new Date (Date.now() + 86400 * 1000),
        ...orderData
    }
    ids.push(id)
    orders.push(newOrderData)

    console.log(newOrderData)
    return response.status(201).json(newOrderData)
    } catch (error) {
        if(error instanceof Error){
            return response.status(400).json({
                message: error.message
            })
        }
        console.log(error)
        return response.status(500).json({
            message: 'Internal server error'
        })
    }
}

const listWorkOrder = (request: Request, response: Response) => {
    return response.json({orders})
}

const retrieveWorkOrder = (request: Request, response: Response): Response => {
    const id             = parseInt(request.params.id)
    const indexWorkOrder = orders.findIndex(el => el.id ===id)
    return response.json(orders[indexWorkOrder])
}


export { createWorkOrder, listWorkOrder, consoleLogTestMiddleware, consoleLogMiddleware }

