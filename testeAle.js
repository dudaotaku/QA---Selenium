const { Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { faker } = require ('@faker-js/faker');
const { generate } = require('gerador-validador-cpf');

async function getElement(driver, locator) {
    await driver.wait(
        until.elementLocated(locator),
        15000
    );
    return await driver.findElement(locator);
}

async function test() {

    let options = new chrome.Options();
    options.options_['debuggerAddress'] = 'localhost:9222';

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        await driver.get('https://minhacooper.com.br/?gad_source=1&gclid=CjwKCAjwzMi_BhACEiwAX4YZUBzrfoaG7AavsxVaRixdne-fB4P0GN8XzFfa5IVwKca-ewTvFwiB5RoC1aYQAvD_BwE');

        let botaoLogin = await driver.wait(until.elementLocated(By.className('btn-account')),5000);
        botaoLogin.click();

        console.log('login clicado');
    } catch (error) {
        console.log("Erro ao clicar no Login", error);
    }

    try {
        let botaoCadastrar = await driver.wait(until.elementLocated(By.id('a-modal-cadastrar')),5000);
        botaoCadastrar.click();
        console.log("botao cadastrar clicado");
    } catch (error) {
        console.log("erro ao clicar o botao cadastrar ", error);
    }

    try {
        const nomeUsuario = await driver.wait(until.elementLocated(By.id('customer_firstname')),5000);
        await driver.wait(until.elementIsVisible(nomeUsuario), 5000);
        await driver.wait(until.elementIsEnabled(nomeUsuario), 5000);
        await nomeUsuario.sendKeys(faker.person.fullName());
        console.log("nome completo adicionado");
    } catch (error) {
        console.log("erro em adicionar nome", error);
    }

    try {
        await driver.executeScript("document.getElementById('customer_cpf_cpf').style.display = 'block';");
        const CPF = await driver.wait(until.elementLocated(By.id('customer_cpf_cpf')),5000);
        await driver.wait(until.elementIsVisible(CPF), 5000);
        await driver.wait(until.elementIsEnabled(CPF), 5000);
        const CPFGerado = generate();
        await CPF.sendKeys(CPFGerado);
        console.log("CPF adicionado");
    } catch(error) {
        console.log ("erro ao adicionar CPF", error);
    }

    await definirGenero(driver);
    console.log("definir genero adicionado");

    try {
        await driver.executeScript("document.getElementById('customer_dateOfBirth_presentation').style.display = 'block';");
        const dataNascimento = await driver.wait(until.elementLocated(By.id('customer_dateOfBirth_presentation')),5000);
        await driver.wait(until.elementIsVisible(dataNascimento), 5000);
        await driver.wait(until.elementIsEnabled(dataNascimento), 5000);
        const nascimento = faker.date.birthdate({ min: 18, max: 115, mode: 'age' });
        const nascimentoFormatado = nascimento.toLocaleDateString('pt-BR');
        await dataNascimento.sendKeys(nascimentoFormatado);
        console.log("data de nascimento adicionada");
    } catch(error) {
        console.log ("erro em adicionar data de nascimento", error);
    }

    try {
        await driver.executeScript("document.getElementById('customer_primaryPhone').style.display = 'block';");
        const numTelefone = await driver.wait(until.elementLocated(By.id('customer_primaryPhone')),5000);
        await driver.wait(until.elementIsVisible(numTelefone),5000);
        await driver.wait(until.elementIsEnabled(numTelefone),5000);
        const telefone = faker.phone.number('(##) #####-####');
        await numTelefone.sendKeys(telefone);
        console.log("numero de telefone adicionado");
    } catch(error) {
        console.log ("erro ao adicionar o numero de telefone", error);
    }

    await botao_Avancar(driver);
    console.log("botão proximo clicado");

    try {
        await driver.executeScript("document.getElementById('customer_defaultShippingAddress_postcode').style.display = 'block';");
        let CEP = await driver.findElement(By.id('customer_defaultShippingAddress_postcode'));
        await driver.wait(until.elementIsVisible(CEP), 5000);
        await driver.wait(until.elementIsEnabled(CEP), 5000);
        await CEP.sendKeys('89112621');
        console.log("CEP preenchido");
    } catch(error) {
        console.log ("erro ao preencher o CEP", error);
    }

    try {
        await driver.executeScript("document.getElementById('customer_defaultShippingAddress_number').style.display = 'block';");
        const numeroCasa = await driver.wait(until.elementLocated(By.id('customer_defaultShippingAddress_number')),5000);
        await driver.wait(until.elementIsVisible(numeroCasa), 5000);
        await driver.wait(until.elementIsEnabled(numeroCasa), 5000);
        await numeroCasa.clear();
        const numeroAleatorio = faker.number.int({min:1, max: 999 });
        await numeroCasa.sendKeys(numeroAleatorio.toString());
        console.log("numero da casa adicionado");
    } catch(error) {
        console.log ("erro ao adicionar numero da casa", error);
    }

    try {
        await driver.executeScript("document.getElementById('customer_defaultShippingAddress_complement').style.display = 'block';");
        const complemento = await driver.wait(until.elementLocated(By.id('customer_defaultShippingAddress_complement')),5000);
        await driver.wait(until.elementIsVisible(complemento), 5000);
        await driver.wait(until.elementIsEnabled(complemento), 5000);
        await complemento.clear();
        await complemento.sendKeys("casa");
        console.log("complemento adicionado");
    } catch(error) {
        console.log ("erro ao adicionar complemento", error);
    }

    await botao_proximo(driver);
    
    try {
        await driver.executeScript("document.getElementById('customer_user_email_first').style.display = 'block';");
        const email = await driver.wait(until.elementLocated(By.id('customer_user_email_first')),5000);
        await driver.wait(until.elementIsVisible(email), 5000);
        await driver.wait(until.elementIsEnabled(email), 5000);
        const emailGerado = faker.internet.email();
        await email.sendKeys(emailGerado);

        await driver.executeScript("document.getElementById('customer_user_email_second').style.display = 'block';");
        const Conf_email = await driver.wait(until.elementLocated(By.id('customer_user_email_second')),5000);
        await driver.wait(until.elementIsVisible(Conf_email), 5000);
        await driver.wait(until.elementIsEnabled(Conf_email), 5000);
        await Conf_email.sendKeys(emailGerado);
        console.log("email adicionado");
    } catch(error) {
        console.log ("erro ao adicionar o email", error);
    }

    try {
        await driver.executeScript("document.getElementById('customer_user_password_first').style.display = 'block';");
        const senha = await driver.wait(until.elementLocated(By.id('customer_user_password_first')),10000);
        await driver.wait(until.elementIsVisible(senha), 1000);
        await driver.wait(until.elementIsEnabled(senha), 1000);
        const senhaGerada = faker.internet.password();
        await senha.sendKeys(senhaGerada);

        await driver.executeScript("document.getElementById('customer_user_password_second').style.display = 'block';");
        const Conf_senha = await driver.wait(until.elementLocated(By.id('customer_user_password_second')),5000);
        await driver.wait(until.elementIsVisible(Conf_senha), 5000);
        await driver.wait(until.elementIsEnabled(Conf_senha), 5000);
        await Conf_senha.sendKeys(senhaGerada);
        console.log("senha adicionada");
    } catch(error) {
        console.log ("erro ao adicionar senha", error);
    } 

    
    try{

    await BotaoFinalizar(driver);

    console.log("Botão finalizar clicado");

    } catch (error) {
        
        console.log("Erro ao clicar no botão finalizar:", error);
    }

    finally {
        await driver.quit();
    }
}

async function definirGenero(driver) {
    let id = 'genero-feminimo';
    await driver.executeScript(`document.getElementById("${id}").click()`);
}

async function botao_Avancar(driver) {
     try {
        const botoes = await driver.findElements(By.css('.btn-cadastro-next-step'));
        if (botoes.length > 0) {
            await botoes[0].click(); 
            console.log("Botão avançar clicado");
        } 
    } catch (error) {
        console.log("Erro ao clicar no botão avançar", error);
    }
}

async function botao_proximo(driver) {
    try {
        const botoes = await driver.findElements(By.css('.btn-cadastro-next-step'));
        if (botoes.length > 1) {
            await botoes[1].click(); 
            console.log("Botão próximo clicado");
        } 
    } catch (error) {
        console.log("Erro ao clicar no botão Próximo", error);
    }
}
async function BotaoFinalizar(driver) {

    await driver.executeScript("document.getElementById('cadastrar-button').style.display = 'block';");
    const botao = await driver.findElement(By.id('cadastrar-button'));
    await driver.wait(until.elementIsVisible(botao), 5000);
    await driver.wait(until.elementIsEnabled(botao), 5000);
    await botao.click();

}


test();
