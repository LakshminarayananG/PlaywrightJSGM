const {ElementsPage} = require('./ElementsPage');
const {WebTablesPage} = require('./WebTablesPage');
const {BrokenLinksPage} = require('./BrokenLinksPage');
const {FormsPage} = require('./FormsPage');
const {PracticeFormPage} = require('./PracticeFormPage');
const {WidgetPage} = require('./WidgetPage');
const {ProgressBarPage} = require('./ProgressBarPage');
const { ToolTipPage } = require('./ToolTipPage');
const {InteractionsPage} = require('./InteractionsPage');

class POBase{

constructor(page){
    this.page = page;
    this.elementsPage = new ElementsPage(this.page);
    this.webTablesPage = new WebTablesPage(this.page);
    this.brokenLinksPage = new BrokenLinksPage(this.page);
    this.formsPage = new FormsPage(page);
    this.practiceFormsPage = new PracticeFormPage(page);
    this.widgetPage = new WidgetPage(page);
    this.progressBarPage = new ProgressBarPage(page);
    this.toolTipPage = new ToolTipPage(page);
    this.interactionsPage = new InteractionsPage(page);
}


getElementsPage(){
    return this.elementsPage;
}

getWebTablesPage(){
    return this.webTablesPage;
}

getBrokenLinksPage(){
    return this.brokenLinksPage;
}


getPracticeFormsPage(){
    return this.practiceFormsPage;
}


getFormsPage(){
    return this.formsPage;
}

getWidgetPage(){
    return this.widgetPage;
}

getProgressBarPage(){
    return this.progressBarPage;
}

getToolTipPage(){
    return this.toolTipPage;
}

getInteractionsPage(){
    return this.interactionsPage;
}





}

module.exports={POBase};