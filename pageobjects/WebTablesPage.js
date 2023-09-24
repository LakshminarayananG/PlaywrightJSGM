const { test, expect } = require('@playwright/test');
class WebTablesPage{
    constructor(page){
        this.page = page;
        this.addFormData = page.locator("#addNewRecordButton");
        this.addFirstName = page.locator('input[id="firstName"]');
        this.addLastName = page.locator('input[id="lastName"]');
        this.addAge = page.locator('input[id="age"]');
        this.addUserEmail = page.locator('input[id="userEmail"]');
        this.addSalary = page.locator('input[id="salary"]');
        this.addDepartment = page.locator('input[id="department"]');
        this.formSubmit = page.locator('#submit');
        this.submittedFirstName = page.locator('//div[@class="rt-tr-group"][4]//div[@role="row"]//div[1]');
        this.submittedLastName = page.locator("//div[@class='rt-tr-group'][4]//div[@role='row']//div[2]");
        this.submittedAge = page.locator("//div[@class='rt-tr-group'][4]//div[@role='row']//div[3]");
        this.submittedEmail = page.locator("//div[@class='rt-tr-group'][4]//div[@role='row']//div[4]");
        this.submittedSalary = page.locator("//div[@class='rt-tr-group'][4]//div[@role='row']//div[5]");
        this.submittedDepartment = page.locator("//div[@class='rt-tr-group'][4]//div[@role='row']//div[6]");
        this.totalRows = page.locator("//div[@class='rt-tbody']//div[@role='rowgroup']");
        this.editSecondRow = page.locator("//div[@class='rt-tr-group'][2]//div[@role='row']//span[1]");
        
    }

    async enterDetailsInWebForm(firstName, lastName, age, userEmail,salary,department){
        await this.addFormData.click();
        await this.addFirstName.fill(firstName);
        await this.addLastName.fill(lastName);
        await this.addAge.fill(age.toString());
        await this.addUserEmail.fill(userEmail);
        await this.addSalary.fill(salary.toString());
        await this.addDepartment.fill(department);
        await this.formSubmit.click();
    }
    
    async validateFormSubmissionWithEnteredDetails(){
        const webTableFilledEntry =[];
        webTableFilledEntry.push(await this.submittedFirstName.first().textContent());
        webTableFilledEntry.push(await this.submittedLastName.first().textContent());
        webTableFilledEntry.push(await this.submittedAge.first().textContent());
        webTableFilledEntry.push(await this.submittedEmail.first().textContent());
        webTableFilledEntry.push(await this.submittedSalary.first().textContent());
        webTableFilledEntry.push(await this.submittedDepartment.first().textContent());
        return webTableFilledEntry;
    }

    async editTableAndValidateChanges(nameToEdit, updatedFirstName, updatedLastName){
        const total_rows = (await this.page.locator("//div[@class='rt-tbody']//div[@role='rowgroup']").all()).length;
        for (let index = 1; index < total_rows; index++) {
            const first_name = await this.page.locator("//div[@class='rt-tr-group'][" + index + "]//div[@role='row']//div[1]").first().textContent();
        
            if (first_name == nameToEdit) {
              await this.editSecondRow.click();
              await this.addFirstName.fill(updatedFirstName);
              await this.addLastName.fill(updatedLastName)
              await this.formSubmit.click();
        
              // Validate if the name changes get reflected
              const updated_firstname = await this.page.locator("//div[@class='rt-tr-group'][" + index + "]//div[@role='row']//div[1]").first().textContent();
              const updated_lastname = await this.page.locator("//div[@class='rt-tr-group'][" + index + "]//div[@role='row']//div[2]").first().textContent();
              expect(updated_firstname).toEqual(updatedFirstName);
              expect(updated_lastname).toEqual(updatedLastName);
              break;
            }
          }
    }
    
}

module.exports={WebTablesPage};