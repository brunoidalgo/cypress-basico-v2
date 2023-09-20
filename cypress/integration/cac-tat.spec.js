/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
  const seconds = 3000

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
      cy.clock()

      cy.get('#firstName').type('Bruno')
      cy.get('#lastName').type('Empke')
      cy.get('#email').type('brunoteste@gmail.com')
      cy.get('#open-text-area').type('Texto teste do Cypress', {'delay':0})
      cy.get('#phone-checkbox').click()
      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')



      cy.tick(seconds)

      cy.get('.error > strong').should('not.be.visible')
    })



    it('preenche e limpa os campos nome, sobrenome, email e telefone',() => {
      cy.clock()
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

      cy.tick(seconds)

      cy.get('.error > strong').should('not.be.visible')
    })



    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => { 
      cy.clock()

      cy.get('button[type="submit"]').click()
      cy.get('.error > strong').should('be.visible')

      cy.tick(seconds)

      cy.get('.error > strong').should('not.be.visible')
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
      cy.clock()

      cy.get('#firstName').type('Bruno')
      cy.get('#lastName').type('Empke')
      cy.get('#email').type('brunoteste@gmail.com')
      cy.get('#open-text-area').type('Texto teste do Cypress', {'delay':100})
      cy.get('#phone-checkbox').check()
      cy.get('button[type="submit"]').click()

      cy.get('.error > strong').should('be.visible')
      cy.tick(seconds)
      cy.get('.error > strong').should('not.be.visible')
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

    it('Verifica mensagem de sucesso, pula o tempo de 3 ms e confirma se a mensagem desapareceu.', () => {
    cy.clock()
      
    cy.get('#firstName').click().type('Bruno')
    cy.get('#lastName').click().type('Empke')
    cy.get('#email').click().type('brunoteste@gmail.com')
    cy.get('#phone').click().type('16 996241597')

    cy.get('#open-text-area').click().type('Teste',{"delay":100})

    cy.get('button[type="submit"]').click()

    cy.contains('Mensagem enviada com sucesso.').should('be.visible')

    cy.tick(seconds)


    cy.contains('Mensagem enviada com sucesso.').should('not.be.visible')

  });
    

    it('lodash', () => {
        Cypress._.times(5, () => {
          const longText = Cypress._.repeat('0123456789', 20)
          cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
          cy.get('#firstName').click().type('Bruno')
          cy.get('#lastName').click().type('Empke')
          cy.get('#email').click().type('brunoteste@gmail.com')
          cy.get('#phone').click().type('16 996241597')

          cy.get('#open-text-area').click().type(longText,{'delay':0})

          cy.get('button[type="submit"]').click()
          cy.get('.success').should('be.visible')
        })
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
      cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const text = Cypress._.repeat('Texto de teste da aplicação', 5) // Cypress._.repeat('value', 3) Comando para repetir um valor string em um campo da aplicação.

      cy.get('#open-text-area')
      .invoke('val', text)
      .should('have.value', text)
    });


    it('faz uma requisição HTTP', () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
    });

    it.only('Desafio: encontrando o gato', () => {
      cy.get('#cat')
      .invoke('show')
      .should('be.visible')
      cy.get('#title')
      .invoke('text', 'CAT TAT')
      cy.get('#subtitle')
      .invoke('text', 'Eu amo gatos')
    });
  })

  