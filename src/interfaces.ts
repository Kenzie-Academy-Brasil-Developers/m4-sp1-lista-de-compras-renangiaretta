interface IListRequest {
    listName: string
    data    : data[]
    id      : number
}

interface data {
    name    : string
    quantity: number
}

type IListRequiredKeys = 'listName' | 'data'

type IDataRequiredKeys = 'name' | 'quantity'

export { IListRequest, data, IListRequiredKeys, IDataRequiredKeys }