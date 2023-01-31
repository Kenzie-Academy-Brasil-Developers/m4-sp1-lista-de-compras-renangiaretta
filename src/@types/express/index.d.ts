import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            indexList   : number
            validateData: {
                name    : string,
                quantity: string
            }
        }
    }
}