const puppeteer = require('puppeteer');
module.exports = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.bancentral.gov.do/a/d/2538-mercado-cambiario');
        await page.waitForSelector('#TasaCambioReferencia', { timeout:  10000});
        const documentURL = await page.evaluate((de) => {
        const aElement = document.querySelector('#TasaCambioReferencia tbody > tr td:last-child > a');
        return aElement.getAttribute("href");
        });
        await browser.close();

        return documentURL;
    } catch (error) {
        console.error(error);
        throw error
    }
}