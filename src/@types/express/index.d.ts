import * as express from 'express'

// A declaração "declare global" informa ao compilador typescript deve ser aplicada ao escopo global, o que significa que estará disponível para todo o aplicativo

// O namespace é uma característica do typescript que permite agrupar tipos e variáveis sob um mesmo nome, fornecendo uma estrutura hierárquica para o código e evitando conflitos de nome.

// O namespace foi declarado globalmente e as interfaces Request e Response foram adicionadas a ele, permitindo que suas propriedades possam ser acessadas em todo o código por meio da notação "Express.Request.<propriedade>" e "Express.Response.<propriedade>"
declare global {
    namespace Express {
        interface Request {
            indexList   : number
            validateData: {
            name        : string,
            quantity    : string
            }
        }
        interface Response {
            status      : number
        }
    }
}