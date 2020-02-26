const locators={

    //OS locators serão divididos por tela. Exemplo: Login, Menu, Contas e etc...

LOGIN:{
    USER:'[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
    },
    MENU:{
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET:'[href="/reset"]',
        MOVIMENTACAO:'[data-test=menu-movimentacao]',
    },
    CONTAS:{
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR:"//table[@class='table']/tbody/tr/td[contains(.,'Conta de teste')]/..//i[@class='far fa-trash-alt']",
    },

    MOVIMENTACAO:{
        DESCRIÇÃO:'[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO:'[data-test=envolvido]',
        BTN_SALVAR_MOVIMENTACAO:'.btn-primary',
    },

    EXTRATO:{
        LINHAS_TABELA_EXTRATO:'.list-group > li',
        XP_BUSCA_ELEMENTO:"//span[contains(.,'Desc')]/following-sibling::small[contains(.,'123')]"
    },

    MESSAGE:'.toast-message'
}

export default locators;
