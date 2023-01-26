import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(express.json())

interface IWorkOrderRequest {
    description: string
    mechanical: string
    client: string
    price: number
}

interface IWorkOrder extends IWorkOrderRequest {
    startDate: Date
    endDate: Date
    id: number
}

const orders: Array<IWorkOrder> = []
const ids: Array<number> = []



app.post('/work-order', (request: Request, response: Response): Response => {
    const  orderData: IWorkOrderRequest = request.body
    const id:number = Math.floor(Math.random()*1000)
    const idExists = ids.find(el => el === id)

    if(idExists) {
        return response.status(409).json({
            message: 'is already exists, try again.'
        })
    }

    const newOrderData: IWorkOrder = {
        id: id,
        startDate: new Date(),
        endDate: new Date (Date.now() + 86400 * 1000),
        ...orderData
    }
    ids.push(id)
    orders.push(newOrderData)

    console.log(newOrderData)
    return response.send('deu certo')
})

app.get('/work-order', (request: Request, response: Response) => {
    return response.json({orders})
})




app.listen(3000, () =>{
    console.log('Server is online.')
})

