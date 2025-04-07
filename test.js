const { Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { faker } = require ('@faker-js/faker');
const { generate } = require('gerador-validador-cpf');


async function test() {

    let options = new chrome.Options();
    options.options_['debuggerAddress'] = 'localhost:9222';


    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try{
        await driver.get('https://minhacooper.com.br/?gad_source=1&gclid=CjwKCAjwzMi_BhACEiwAX4YZUBzrfoaG7AavsxVaRixdne-fB4P0GN8XzFfa5IVwKca-ewTvFwiB5RoC1aYQAvD_BwE');
        
        //botaoLogin
       
        let botaoLogin = await driver.wait(until.elementLocated(By.className('btn-account')),10000);
        botaoLogin.click();

        console.log('login clicado');
    }catch (error) {

        console.log("Erro ao clicar no Login", error);
      
    }

    try{
        //botao cadastrar
        let botaoCadastrar = await driver.wait(until.elementLocated(By.id('a-modal-cadastrar')),10000);
        botaoCadastrar.click();

        console.log("botao cadastrar clicado");
  
    }catch (error){

        console.log("erro ao clicar o botao cadastrar ", error);

    }

        // cadastro de pessoa fisica 
        // obs: sistema do site já tem como padrão a seleção da opção de pessoa fisica.
    
    try{
        //nome do usuario
        await driver.executeScript("document.getElementById('customer_firstname').style.display = 'block';");

        const nomeUsuario = await driver.wait(until.elementLocated(By.id('customer_firstname')),10000);       
       await driver.wait(until.elementIsVisible(nomeUsuario), 10000);
       await driver.wait(until.elementIsEnabled(nomeUsuario), 10000);
       await nomeUsuario.sendKeys(faker.person.fullName());
        

        console.log("nome completo adicionado");
  
    }catch (error){

        console.log("erro em adicionar nome", error);

    }

    try{
        //CPF
        await driver.executeScript("document.getElementById('customer_cpf_cpf').style.display = 'block';");

        const CPF = await driver.wait(until.elementLocated(By.id('customer_cpf_cpf')),10000);       
       await driver.wait(until.elementIsVisible(CPF), 10000);
       await driver.wait(until.elementIsEnabled(CPF), 10000);
       
       const CPFGerado = generate();
       await CPF.sendKeys(CPFGerado);
        
        console.log("CPF adicionado");

    }catch(error){

        console.log ("erro ao adicionar CPF",error);

    }

    try{
        await driver.executeScript(`
            document.getElementsByClassName('form-group')[6].style.display = 'block';
        `); 
        let radioButton = await driver.findElement(By.css('input[type="radio"][value="1"]'));
        await driver.wait(until.elementIsVisible(radioButton), 5000);
        await driver.wait(until.elementIsEnabled(radioButton), 5000);
        await radioButton.click();
        /*await driver.executeScript(`
            const radio = document.getElementById('genero-feminino');
            if (radio) {
                radio.style.display = 'block';  // torna visível, se estiver escondido
                radio.checked = true;           // marca o botão
                radio.dispatchEvent(new Event('change', { bubbles: true })); // simula a ação do usuário
            }
        `);
        await driver.executeScript(`document.getElementById('${generoId}').click();`);

        
      
        /*await driver.executeScript("document.getElementById('genero-feminimo').style.display = 'block';");
        let genero = await driver.findElement(By.id('genero-feminino'));
        await genero.click();

       

       
        const genero = Math.random() < 0.5 ? 'genero-feminino' : 'genero-masculino';
        const radioGenero = await driver.wait(until.elementLocated(By.id(genero)), 10000);
        await driver.wait(until.elementIsVisible(radioGenero), 10000);
        await driver.wait(until.elementIsEnabled(radioGenero), 10000);
        await radioGenero.click();*/

        console.log("genero selecionado");
    }catch(error){

        console.log ("erro ao selecionar o genero",error);
        
    }

    try{
        //data de nascimento

        await driver.executeScript("document.getElementById('customer_dateOfBirth_presentation').style.display = 'block';");

        const dataNascimento = await driver.wait(until.elementLocated(By.id('customer_dateOfBirth_presentation')),10000);       
       await driver.wait(until.elementIsVisible(dataNascimento), 10000);
       await driver.wait(until.elementIsEnabled(dataNascimento), 10000);

       const nascimento = faker.date.birthdate({ min: 18, max: 115, mode: 'age' });
       const nascimentoFormatado = nascimento.toLocaleDateString('pt-BR'); // Ex: 12/03/1985

       await dataNascimento.sendKeys(nascimentoFormatado);
        


        console.log("data de nacimento adicionada");

    }catch(error){

        console.log ("erro em adicionar data de nascimento",error);
        
    }

    try{
        //telefone
        await driver.executeScript("document.getElementById('customer_primaryPhone').style.display = 'block';");

        const numTelefone = await driver.wait(until.elementLocated(By.id('customer_primaryPhone')),10000);       
       await driver.wait(until.elementIsVisible(numTelefone), 10000);
       await driver.wait(until.elementIsEnabled(numTelefone), 10000);

        const telefone = faker.phone.number('(##) #####-####');

        await numTelefone.sendKeys(telefone );
        

        console.log("numero de telefone adicionado");

    }catch(error){

        console.log ("erro ao adicionar o numro de telefone",error);

    }


    //BOTAO PARA PASSAR PARA O PROXIMO BLOCO

    try{
        //primeiro botao avançar
        let botoesAvancar = await driver.wait(
            until.elementsLocated(By.css('.button-default.btn-cadastro-next-step')),
            10000
        );
        
        if (botaoAvançar.length >= 1) {
            await driver.wait(until.elementIsVisible(botaoAvançar[0]), 5000);
            await driver.wait(until.elementIsVisible(botaoAvançar[0]), 5000);
            await botaoAvançar[0].click();
            //console.log("Primeiro botão 'Avançar' clicado com sucesso.");
        }
        console.log("botao avançar selecionado");

    }catch(error){

        console.log ("erro ao selecionar o botao avançar",error);
        
    }


      ///APARTIR DESTE BLOCO TESTAR DEPOIS DE FALAR COM O VINI


    try{
        // CEP    
        await driver.executeScript("document.getElementById('customer_defaultShippingAddress_postcode').style.display = 'block';");

        const CEP = await driver.wait(until.elementLocated(By.id('customer_defaultShippingAddress_postcode')),10000);       
       await driver.wait(until.elementIsVisible(CEP), 10000);
       await driver.wait(until.elementIsEnabled(CEP), 10000);
        
       const cepBr = faker.location.zipCode('#####-###');
       await CEP.sendKeys(cepBr);

    }catch(error){

        console.log ("erro ao preencher o CEP",error);
        
    }

    try{
        //numero da casa
        await driver.executeScript("document.getElementById('customer_defaultShippingAddress_number').style.display = 'block';");

        const numeroCasa = await driver.wait(until.elementLocated(By.id('customer_defaultShippingAddress_number')),10000);       
       await driver.wait(until.elementIsVisible(numeroCasa ), 10000);
       await driver.wait(until.elementIsEnabled(numeroCasa ), 10000);

        const numeroAleatorio = faker.number.int({ max: 9999 });
        await numeroCasa.sendKeys(numeroAleatorio.toString());

        console.log("numero da casa adicionado ");

    }catch(error){

        console.log ("erro ao adicionar numero da casa",error);
        
    }

    try{
        //complemento do endereço
        await driver.executeScript("document.getElementById('customer_defaultShippingAddress_complement').style.display = 'block';");

        const complemento = await driver.wait(until.elementLocated(By.id('customer_defaultShippingAddress_complement')),10000);       
       await driver.wait(until.elementIsVisible(complemento), 10000);
       await driver.wait(until.elementIsEnabled(complemento), 10000);
       await complemento.sendKeys('casa');
        

        console.log("complemento adicionado");
  
    }catch(error){

        console.log ("erro ao adicionar complemento",error);
        
    }

// BOTAO PARA PASSAR PARA O PROXIMO BLOCO


    try{
    //segundo botao avançar
    let botoesAvancar = await driver.wait(
        until.elementsLocated(By.css('.button-default.btn-cadastro-next-step')),
        10000
    );
    
        if (botaoAvançar.length >= 1) {
          await driver.wait(until.elementIsVisible(botaoAvançar[1]), 5000);
          await driver.wait(until.elementIsEnabled(botaoAvançar[1]), 5000);
          await botaoAvançar[1].click();
     
        }
        console.log("botão 'Avançar' clicado ");
    }catch(error){

        console.log("erro ao clicar o botao avançar", error);

    }
    
    
    try{
        await driver.executeScript("document.getElementById('cadastrar-button').style.display = 'block';");

        let botaoFinalizar = await driver.wait(until.elementLocated(By.id('cadastrar-button')), 10000);
        await botaoFinalizar.click();


        console.log("Botao finalizar clicado");

    }catch(error){

        console.log ("erro ao clicar no botao finalizar",error);
        
    }

///TESTAR DEPOIS DE FALAR COM O VINI :// BLOCO DE EMAIL E SENHA

    try{
        //bloco de confirmação de email
        await driver.executeScript("document.getElementById('customer_user_email_first').style.display = 'block';");

        const email = await driver.wait(until.elementLocated(By.id('customer_user_email_first')),10000);       
       await driver.wait(until.elementIsVisible(email), 10000);
       await driver.wait(until.elementIsEnabled(email), 10000);
       
       const emailGerado = faker.internet.email();
       await email.sendKeys(emailGerado);

       //bloco de confirmação do email
       await driver.executeScript("document.getElementById('customer_user_email_second').style.display = 'block';");

        const Conf_email = await driver.wait(until.elementLocated(By.id('customer_user_email_second')),10000);       
       await driver.wait(until.elementIsVisible(Conf_email), 10000);
       await driver.wait(until.elementIsEnabled(Conf_email), 10000);
       await Conf_email.sendKeys(emailGerado);


        console.log("email adicionado");

    }catch(error){

        console.log ("erro ao adicionar o email",error);
        
    }
    try{
        //senha 
        await driver.executeScript("document.getElementById('customer_user_password_first').style.display = 'block';");

        const senha = await driver.wait(until.elementLocated(By.id('customer_user_password_first')),10000);       
       await driver.wait(until.elementIsVisible(senha), 10000);
       await driver.wait(until.elementIsEnabled(senha), 10000);
       
       const senhaGerada = faker.internet.password();
       await senha.sendKeys(senhaGerada);


        await driver.executeScript("document.getElementById('customer_user_password_second').style.display = 'block';");

        const Conf_senha = await driver.wait(until.elementLocated(By.id('customer_user_password_second')),10000);       
       await driver.wait(until.elementIsVisible(Conf_senha), 10000);
       await driver.wait(until.elementIsEnabled(Conf_senha), 10000);
       await Conf_senha.sendKeys(senhaGerada);

        console.log("senha adicionada");

    }catch(error){

        console.log ("erro ao adicionar senha",error);
        
    }


    finally{

    }
   
}

test();