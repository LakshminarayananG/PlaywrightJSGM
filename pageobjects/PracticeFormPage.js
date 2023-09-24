const { test, expect } = require('@playwright/test');
class PracticeFormPage{


    constructor(page){
        this.page = page;
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.userEmail = page.locator("#userEmail");
        this.userNumber = page.locator("#userNumber");
        this.dateOfBirth = page.locator("#dateOfBirthInput");
        this.inputImageLoc = page.locator("#uploadPicture");
        this.currentAddress = page.locator("#currentAddress");
        this.confirmationMessage = page.locator("#example-modal-sizes-title-lg");
        this.confphoneNumber = page.locator("//td[text()='Mobile']/following-sibling::td");
        this.confStudentName = page.locator("//td[text()='Student Name']/following-sibling::td");

    }


async fillPracticeForm(firstName, lastName, userEmail,userNumber,dateOfBirth,inputImage,currentAddress){
    // Fill out the form with input details
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.userEmail.fill(userEmail);
    await this.page.evaluate('document.getElementById("gender-radio-1").checked=true;');
  
    await this.userNumber.fill(userNumber);
    await this.dateOfBirth.fill(dateOfBirth);
    await this.page.keyboard.press('Enter');
  
  
    await this.page.evaluate('document.getElementById("hobbies-checkbox-2").checked=true;');
    await this.inputImageLoc.setInputFiles(['./'+inputImage+'']);
    await this.currentAddress.fill(currentAddress);
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  
    // Submit the form
    await this.page.keyboard.press('Enter');
  
    
}


async validateFilledPracticeFormData(){
// Assert that the form was submitted successfully and validate the mobile number in confirmation page
const filledFormDetails = [];
filledFormDetails.push(await this.confirmationMessage.textContent());
filledFormDetails.push(await this.confphoneNumber.textContent());
filledFormDetails.push(await this.confStudentName.textContent());
return filledFormDetails;
}
}


module.exports={PracticeFormPage};