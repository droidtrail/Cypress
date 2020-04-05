const buildEnv = () =>{
    cy.server()
    //Rota de Login
    cy.route({
        method:'POST',
        url:'/signin',
        response:{
         id:3839,
         nome:'UsuarioFalso',
         token:'Uma string muito grande que não deveria ser aceita, mas vai'
        }
    }).as('Login')
    
    cy.route({
        method:'GET',
        url:'/saldo',
        response:[{
             conta_id:'999',
             conta:'Carteira',
             saldo:'1500.00'
        },
        {
             conta_id:'9909',
             conta:'Banco',
             saldo:'1000000.00'
        },
        ]
    }).as('Saldo')

    cy.route({
        method:'GET',
        url:'/contas',
        response:[
            {id:'03',nome:'Carteira',visivel:true,usuario_id:1},
            {id:'04',nome:'Banco',visivel:true,usuario_id:1},
        ]
    }).as('Obter Contas')
}
export default buildEnv