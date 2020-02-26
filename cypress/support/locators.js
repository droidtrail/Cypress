const locators={

    //OS locators serão divididos por tela. Exemplo: Login, Menu, Contas e etc...

    LOGIN:{
        USER:'[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU:{
        HOME:'[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET:'[href="/reset"]',
        MOVIMENTACAO:'[data-test=menu-movimentacao]',
    },

    CONTAS:{
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome =>`//table[@class='table']/tbody/tr/td[contains(.,\'${nome}\')]/..//i[@class='far fa-trash-alt']`,
    },

    MOVIMENTACAO:{
        DESCRIÇÃO:'[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO:'[data-test=envolvido]',
        CONTA:'[data-test=conta]',
        STATUS_PAGA:'[data-test=status]',
        BTN_SALVAR_MOVIMENTACAO:'.btn-primary',
    },

    EXTRATO:{
        LINHAS_TABELA_EXTRATO:'.list-group > li',
        FN_XP_BUSCA_ELEMENTO:(desc, value) =>`//span[contains(.,\'${desc}\')]/following-sibling::small[contains(.,\'${value}\')]`
    },

    SALDO:{
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,\'${nome}\')]/following-sibling::td[contains(.,'123,00')]`
    },

    MESSAGE:'.toast-message'
}

export default locators;
