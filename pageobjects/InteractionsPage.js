class InteractionsPage{

    constructor(page){
        this.page=page;
        this.interactions = page.locator("text=Interactions");
        this.dragAndDropLink = page.locator("text=Droppable");
        this.draggableLink = page.locator("div#draggable");
        this.droppableLink = page.locator("div#droppable").first();
        

    }

    async navigateToDragAndDropPage(){
        await this.interactions.click();
        await this.dragAndDropLink.click();
    }

    async dragAndDropElementText(){
        return await this.droppableLink.textContent();
    }

    async performDragAndDrop(){
        await this.draggableLink.dragTo(this.droppableLink);
    }

}

module.exports={InteractionsPage}