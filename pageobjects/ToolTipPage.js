class ToolTipPage{

    constructor(page){
        this.page=page;
        this.toolTipLink = page.locator("button#toolTipButton");
        this.toolTipHover = "div.tooltip-inner";
        this.toolTipText = page.locator("div.tooltip-inner");
    }

    async hoverOnToolTip(){
    await this.toolTipLink.hover();
    }

    async validateToolTip(){
    await this.page.waitForSelector(this.toolTipHover);
    return await this.toolTipText.textContent();
    }


}


module.exports={ToolTipPage}