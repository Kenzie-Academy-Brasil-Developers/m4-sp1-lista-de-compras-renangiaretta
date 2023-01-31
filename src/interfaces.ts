interface IListRequest {
    listName: string
    data: data[]
    id: number | undefined
}

interface data {
    name: string
    quantity: string
}

export { IListRequest, data}