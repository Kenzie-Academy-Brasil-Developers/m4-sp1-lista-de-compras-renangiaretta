
// As interfaces são uma maneira de garantir que os objetos que seguem esse formato tenham as propriedades esperadas.
interface IListRequest {
    listName: string
    data    : data[]
    id      : number
}

interface data {
    name    : string
    quantity: number
}


// Este é um "tipo" de Typescript que define as chaves obrigatórias de um objeto. Neste caso, para um objeto ser considerado válido, ele precisa ter pelo menos uma das chaves "listName" ou "data". 
type IListRequiredKeys = 'listName' | 'data'

type IDataRequiredKeys = 'name' | 'quantity'

export { IListRequest, data, IListRequiredKeys, IDataRequiredKeys }