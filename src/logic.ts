import { lists } from './database'
import { IListRequest, IListRequiredKeys } from './interfaces'
import  { Request, Response } from 'express'

// Esta função, caso haja itens cadastrados na lista, gera um ID sequencial para eles por meio de uma verificação em que o ID é gerado somando uma unidade ao valor do último ID cadastrado na lista.
function generateId () {
    if(lists.length === 0){
        return 1
    } else {
        return lists[lists.length -1].id + 1
    }
}

// Essa função serve para validar se um objeto (representado pelo argumento "payLoad") tem as chaves obrigatórias necessárias para uma requisiçãp de lista.
// A função começa obtendo as chaves do objeto "payLoad" com o método "Object.keys", em seguida, a constante "requiredKeys" é definida como um array de strings que contém as chaves obrigatórias para uma requisição de lista, que são "listName" e "data".
// A constante "containsAllRequired", é definida como um "boolean" que retorna "true", se TODOS os elementos do array requiredKeys correspondem à uma chave no array "keys".
// É feita uma verificação se "containsAllRequired" é "false" ou se o número de chaves do objeto "payLoad" é maior que 2. Caso uma dessas afirmações seja verdadeira, É criado um erro que diz quais são as chaves necessárias para que a requisição tenha sucesso. Se a requisição estiver correta, será retornado um objeto "payLoad" com as informações necessárias. 
const validateListData = (payload: any): IListRequest => {
    const keys: Array<string>                    = Object.keys(payload)
    const requiredKeys: Array<IListRequiredKeys> = ['listName', 'data']
    const containsAllRequired: boolean           = requiredKeys.every((key: string) => {
    return keys.includes(key)
    })
    if(!containsAllRequired || keys.length > 2){
        throw new Error(`Required keys are: ${requiredKeys}. Nothing else!`)
    }
    console.log(payload)
    return payload
}

// ---------------------------------------------------------------------------------------------
const creteNewList = (request: Request, response: Response): Response => {
    try {
        const listData: IListRequest    = validateListData(request.body)
        const newListData: IListRequest = {
            ...listData,
            id: generateId()
        }
        if(typeof listData.listName === 'string'){
            lists.push(newListData)
            return response.status(201).json(newListData)
        }else{
            throw new Error('The list name must be a string.')
        }
    } catch (error) {
        if(error instanceof Error){
            return response.status(400).json({
                message: error.message
            })
        }
        return response.status(500).json({
            message: 'Internal server error.'
        })
    }
}


// Esta função faz uma requuisição do tipo GET na rota "/purchaseList" para obter uma lista com todos is itens cadastrados.
const getAllLists = ( request: Request, response: Response ): Response => {
    try {
        return response.status(200).json(lists)
        
    } catch (error) {
        if(error instanceof Error){
            return response.status(400).json({
                message: error.message
            })
        }
        return response.status(500).json({
            message: 'Internal server error.'
        })
    }
}

// Esta função faz uma requisição do tipo GET na rota "/purchaseList" que busca um item específico na lista à partir do seu ID.
// Primeiro ela armazena o ID numa constante "id" do tipo "number", que é obtido por meio de uma transformação de uma string para "number" por meio do método parseInt na propriedade params.id da requisição.
// Depois ela armazena em uma constante "indexList" do tipo "number", o que é obtido a partir de uma busca do índice das listsa que é igual ao id da lista.
const getListById = (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)
    const indexList  = lists.findIndex(el => el.id === id)
    try {
        if(indexList >= 0){
            return response.status(200).json(lists[indexList])
        } 
    } catch (error) {
        if(error instanceof Error){
            return response.status(500).json({
                message: 'Internal server error.'
            })
        }
    }
    return response.status(404).json({
        message: '404 NOT FOUND'
})
}


// Essa função deleta uma lista específica.
const deleteList = (request: Request, response: Response): Response => {
    const indexList: number = request.indexList
    try {
        if(indexList !== -1){
            lists.splice(indexList, 1)
            return response.status(200).json()
        }

        else if(indexList === -1) {
            return response.status(400).json({
                message: 'List does not exist.'
            })
        }
    } catch (error) {
        if (error instanceof Error){
            return response.status(500).json({
                message: 'Internal server error'
            })
        }
    }
    return response.status(404).json({
        message: '404 NOT FOUND'
    })
}
// Essa função deleta um item de uma lista
const deleteListItem = (request: Request, response: Response): Response => {
    // Primeiro ela armazena o id da lista transformando em number a string "id" obtida nos parâmetros da requisição
    const id: number        = parseInt(request.params.id)
    // Depois é feita uma busca no array de listas que procura uma lista com id igual ao que foi passado na requisição
    let   indexList: number = lists.findIndex(el => el.id === id)
    // É armazenado em uma constante "name" do tipo string o valor obtido nos parametros da requisição
    const name: string      = request.params.name
    // É verificado se a lista existe e possui itens 
    if(indexList!== -1 && lists[indexList] && lists[indexList].data){
        // Procura se a lista possui um item com um nome igual ao passado na requisição
        let indexName: number = lists[indexList].data.findIndex(el => el.name === name)
        try {
            if(indexName !== -1 && indexList !== -1 && lists[indexList].data){
                // É removido o item da lista
                lists[indexList].data.splice(indexName, 1)
                return response.status(204).json()
            }
            } catch(error) {
                if (error instanceof Error){
                    return response.status(500).json({
                        message: error.message
                    })
                }
            }
    }
    return response.status(404).json({
        message: `404 NOT FOUND`
    })
}

// Esta função atualiza um item específico de uma lista
const updateList = (request: Request, response: Response): Response => {
    try {
        //Armazena em uma constante um "id" do tipo number obtido transformando uma string obtida na requisição para um tipo number
        const id: number        = parseInt(request.params.id)
         // É feita uma busca no array de listas que procura uma lista com id igual ao que foi passado na requisição
        let   indexList: number = lists.findIndex(el => el.id === id)
        // É armazenado em uma constante o nome obtido nos parâmetros da requisição
        const name: string      = request.params.name
        // Procura se a lista possui um item com um nome igual ao passado na requisição
        let   indexName: number = lists[indexList].data.findIndex(el => el.name === name)
        // Troca o item da lista pelo novo item passado no corpo da requisição
        lists[indexList].data.splice(indexName, 1, request.body)
        return response.status(204).json()
    } catch (error){
        return response.status(404)
    }
}

export { generateId, creteNewList, getAllLists, getListById, deleteList, deleteListItem, updateList }