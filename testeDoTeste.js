const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");


(async function firstTest() {
  let driver;
 
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
 
    let title = await driver.getTitle();
    assert.equal("Web form", title);
 
    await driver.manage().setTimeouts({implicit: 2000});


    await new Promise(r => setTimeout(r, 2000));
    let textBox = await driver.findElement(By.name('my-text'));


    await new Promise(r => setTimeout(r, 2000));
    let submitButton = await driver.findElement(By.css('button'));
   
    await new Promise(r => setTimeout(r, 2000));
    await textBox.sendKeys('Selenium');


    await new Promise(r => setTimeout(r, 2000));
    await submitButton.click();
 
    let message = await driver.findElement(By.id('message'));


    await new Promise(r => setTimeout(r, 2000));
    let value = await message.getText();


    await new Promise(r => setTimeout(r, 2000));
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e)
  } finally {
    
  }


}())

