import express, { Application } from 'express'
import { creteNewList, getAllLists, getListById, deleteList, deleteListItem, updateList} from './logic'
import { deleteListMiddleware, validateDataMiddleware } from './middlewares'


// Cria uma variável app e atribui a ela uma nova instância do framework "Express" por meio da chamada "express()", fazendo com que a variável "app" possa ser usada para configurar as rotas e outras opções da aplicação "Express".
// A variável "app" é tipada como "Application", que é uma interface exportada pelo pacote "express" e que representa uma aplicação "Express".
const app: Application = express()

// O método "app.use" está sendo usado para adicionar ao aplicativo um "middleware" que é fornecido pelo pacote "express". Este "middleware" espera que o corpo da "request" seja enviado como "JSON" e o converte para um "objeto" javascript, tornando-o disponível na "request.body".
app.use(express.json())

// O método "app.post" está sendo usado para definir uma rota para o aplicativo. O método "app.post" aceita dois argumentos. O primeiro é a URL da rota e o segundo um manipulador de rotas. A rota é executada quando o aplicativo recebe uma solicitação "HTTP POST" para a "URL" "/purchaseList"
app.post('/purchaseList', creteNewList)

app.get('/purchaseList', getAllLists)

app.get(`/purchaseList/:id`, getListById)

app.delete('/purchaseList/:id', deleteListMiddleware, deleteList)

app.delete('/purchaseList/:id/:name', deleteListItem)

app.patch('/purchaseList/:id/:name', validateDataMiddleware, updateList)


// Inicia um servidor web na porta 3000 usando a biblioteca "Express.js". O segundo argumento é uma função callback que é executada quando o servidor está pronto para receber requisições.
app.listen(3000, () => {
    console.log('Server is online.')
})