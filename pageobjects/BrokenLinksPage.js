const { test, expect } = require('@playwright/test');
class BrokenLinksPage{

    constructor(page){
        this.page = page;
        this.brokenImageLink = this.page.locator("//p[text()='Broken image']/following-sibling::img");
        this.validImageLink = this.page.locator("//p[text()='Valid image']/following-sibling::img").first();
    }

async validateBrokenImage(){
        // Get the broken image
    const brokenImage = await this.brokenImageLink.boundingBox();
    const brokenImageDimensions = [];
  
    // Assert that the image is broken
    brokenImageDimensions.push(brokenImage['height']);
    brokenImageDimensions.push(brokenImage['width']);
    
    // Adding check to find the height of the valid image
    const validImage = await this.validImageLink.boundingBox();
    console.log("Height of valid image is: " + validImage['height']);
    return brokenImageDimensions;
    }
}


module.exports={BrokenLinksPage}