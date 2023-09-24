const { test, expect } = require('@playwright/test');
class ElementsPage {

    constructor(page){
        this.page = page;
        this.elements = page.locator("text=Elements");
        this.webTables = page.locator('text=Web Tables');
        this.brokenLinks = page.locator("//span[text()='Broken Links - Images']");

    }

async navigateToTables(){
    await this.elements.click();
    await this.webTables.click();
}

async navigateToBrokenLinks(){
    await this.elements.click();
    await this.brokenLinks.click();
}





}

module.exports={ElementsPage}