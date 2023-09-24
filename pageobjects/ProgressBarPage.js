const { test, expect } = require('@playwright/test');
class ProgressBarPage{

    constructor(page){
        this.page=page;
        this.progressStart = page.locator("#startStopButton");
        this.progressCompletion = page.locator("//div[@id='progressBarContainer']//button[@type='button']");
    }

async startProgressBar(){
    await this.progressStart.click();
}

async validateProgressBarCompletion(){
    await this.page.waitForFunction(() => {
        const progressBar = document.querySelector('.progress-bar');
        return progressBar.style.width === '100%';
      });
      return await this.progressCompletion.textContent();
}


}

module.exports={ProgressBarPage};