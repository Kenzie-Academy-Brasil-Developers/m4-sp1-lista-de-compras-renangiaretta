interface IListRequest {
    listName: string
    data    : data[]
    id      : number
}

interface data {
    name    : string
    quantity: string
}

type listRequiredKeys = 'listName' | 'data'

export { IListRequest, data, listRequiredKeys }