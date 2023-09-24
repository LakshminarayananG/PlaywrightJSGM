class FormsPage{

    constructor(page){
        this.page = page;
        this.forms = page.locator('text=Forms');
        this.practiceForm = page.locator("//span[text()='Practice Form']");
    }


async navigateToPracticeForm(){
    await this.forms.click();
    await this.practiceForm.click();

}
}

module.exports={FormsPage};