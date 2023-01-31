interface IWorkOrderRequest {
    description: string
    mechanical : string
    client     : string
    price      : number
}

interface IWorkOrder extends IWorkOrderRequest {
    startDate: Date
    endDate  : Date
    id       : number
}

type WorkOrderRequiredKeys = 'description' | 'mechanical' | 'client' | 'price'

export { IWorkOrderRequest, IWorkOrder, WorkOrderRequiredKeys }