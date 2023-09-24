class WidgetPage{

constructor(page){
    this.page=page;
    this.widgetLink = page.locator("text=Widget");
    this.progressBar = page.locator("//span[text()='Progress Bar']");
    this.toolTipPage = page.locator("//span[text()='Tool Tips']");
}

async navigateToProgressBarPage(){
    await this.widgetLink.click();
    await this.progressBar.click();
}

async navigateToToolTipPage(){
    await this.widgetLink.click();
    await this.toolTipPage.click();
}

}

module.exports={WidgetPage}