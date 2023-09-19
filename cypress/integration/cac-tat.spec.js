/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach('Visitando página',()=> {
    cy.visit('./src/index.html')
  })
    it('verifica o título da aplicação',() => {
      

      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })



    it ('preenche os campos obrigatórios e envia o formulário', () => {

      const longText = 'Testando a digitação rápida no Cypress na aplicação'
      cy.get('#firstName').click().type('Bruno')
      cy.get('#lastName').click().type('Empke')
      cy.get('#email').click().type('brunoteste@gmail.com')
      cy.get('#phone').click().type('16 996241597')

      cy.get('#open-text-area').click().type(longText,{'delay':0})

      cy.get('button[type="submit"]').click()
      cy.get('.success').should('be.visible')
    })



    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() => {
      cy.get('#firstName').type('Bruno')
      cy.get('#lastName').type('Empke')
      cy.get('#email').type('brunoteste@gmail.com')

      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')
    })


    it('Validando o campo telefone vazio',() => {
      cy.get('#phone')
      .click()
      .type('Teste')


      cy.get('#phone-checkbox').click()

      cy.get('#phone').should('have.value', '')
      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')

    })



    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
      cy.get('#firstName').type('Bruno')
      cy.get('#lastName').type('Empke')
      cy.get('#email').type('brunoteste@gmail.com')
      cy.get('#open-text-area').type('Texto teste do Cypress', {'delay':0})
      cy.get('#phone-checkbox').click()
      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')
    })



    it('preenche e limpa os campos nome, sobrenome, email e telefone',() => {
      cy.get('#firstName')
      .type('Bruno')
      .should('contain.value', 'Bruno')
      .clear()
      .should('contain', '')
      cy.get('#lastName')
      .type('Empke')
      .should('contain.value', 'Empke')
      .clear()
      .should('contain', '')
      cy.get('#email')
      .type('brunoteste@gmail.com')
      .should('contain.value', 'brunoteste@gmail.com')
      .clear()
      .should('contain', '')
      cy.get('#phone')
      .type('16 996241597')
      .should('contain.value', '16996241597')
      .clear()
      .should('contain', '')

      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')
    })



    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')
    })



    it('envia o formuário com sucesso usando um comando customizado',() => {
      cy.fillMandatoryFieldsAndSubmit('Bruno', 'Empke')
    })


    
    it('envia o formuário com sucesso usando um comando customizado',() => {
      cy.verifyButton() // Primeiro argumento class, texto que deseja encontrar.
    })



    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', () => {
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu valor', () => {
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })


    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value=feedback]')
      .check()
      .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento"', () => {
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .should('be.checked')
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })


    it('marca ambos checkboxes, depois desmarca o último',() => {

      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
      
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
      cy.get('#firstName').type('Bruno')
      cy.get('#lastName').type('Empke')
      cy.get('#email').type('brunoteste@gmail.com')
      cy.get('#open-text-area').type('Texto teste do Cypress', {'delay':100})
      cy.get('#phone-checkbox').check()
      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixture',() => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/cypress.env.json')
       .then(input => {
         expect(input[0].files[0].name).to.equal('cypress.env.json')
       })
    })

    it('seleciona um arquivo simulando um drag-and-drop',()=> {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/cypress.env.json',{action:'drag-drop'})
      .then(input => {
        expect(input[0].files[0].name).to.equal('cypress.env.json')
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() => {
      cy.fixture('cypress.env.json')
      .as('example-file')

      cy.get('input[type="file"]')
      .selectFile('@example-file')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('cypress.env.json')
      })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a').invoke('removeAttr', 'target').click()

      cy.contains('Talking About Testing').should('be.visible')
    });

    it('simulando a execução em um viewport mobile', () => {
        
    });

    
    
  })

  