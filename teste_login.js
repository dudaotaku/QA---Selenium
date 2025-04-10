const { Builder, By, until, checkedLocator } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { faker } = require('@faker-js/faker');


async function test() {

    let options = new chrome.Options();
    options.options_['debuggerAddress'] = 'localhost:9222';


    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        await driver.get('https://minhacooper.com.br/?gad_source=1&gclid=CjwKCAjwzMi_BhACEiwAX4YZUBzrfoaG7AavsxVaRixdne-fB4P0GN8XzFfa5IVwKca-ewTvFwiB5RoC1aYQAvD_BwE');

        //botaoLogin

        let botaoLogin = await driver.wait(until.elementLocated(By.className('btn-account')), 10000);
        botaoLogin.click();

        console.log('login clicado');
    } catch (error) {

        console.log("Erro ao clicar no Login", error);

    }

    try {
        await driver.sleep(1000);

        let preencherEmail = await driver.findElement(By.id('_username'));
        await preencherEmail.sendKeys('dudapereiraotaku@gmail.com');


        console.log('email preenchido');
    } catch (error) {

        console.log("Erro ao preencher o email", error);

    }

    try {
        await driver.sleep(1000);

        let preencherSenha = await driver.findElement(By.id('_password'));
        await preencherSenha.sendKeys('Cachorralili1.');


        console.log('senha preenchida');
    } catch (error) {

        console.log("Erro ao preencher a senha", error);

    }

    try {
        //botao mostrar senha
        let botaoMostrarSenha = await driver.wait(until.elementLocated(By.id('_passwordToggler')), 10000);
        botaoMostrarSenha.click();

        console.log("botao Mostrar Senha clicado");

        await driver.sleep(1000);

        botaoMostrarSenha.click();

        console.log("botao Mostrar('ocultar') Senha clicado");

    } catch (error) {

        console.log("erro ao clicar o botao Mostrar Senha", error);

    }

    try {
        //botao Entrar
        await new Promise(r => setTimeout(r, 1000));

        let botaoEntrar = await driver.wait(until.elementLocated(By.className('button button-default button-block')), 10000);
        botaoEntrar.click();

        console.log("botao entrar clicado");

    } catch (error) {

        console.log("erro ao clicar o botao entrar", error);

    }

    finally {

    }


}


test();