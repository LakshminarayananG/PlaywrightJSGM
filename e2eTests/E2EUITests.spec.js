const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { POBase } = require('../pageobjects/POBase');
const testData = JSON.parse(JSON.stringify(require('../testdata/inputdata.json')));
const appURL = "https://demoqa.com/";

let browser;
let page;

test.beforeAll('Browser setup', async()=>{
  browser = await chromium.launch();
});

test.afterAll('Browser tearDown', async()=>{
  await browser.close();
});

test.beforeEach('New Page creation before each test', async( )=>{
  page = await browser.newPage();
  await page.goto(appURL);
});

test.afterEach('Close created Page after each test', async( )=>{
  await page.close();
});

test('@Web TC01- Scenario A - Verify user can enter new data into the table', async ({  }) => {

    const poBase = new POBase(page);
    const elementsPage = poBase.getElementsPage();
    const webTablesPage = poBase.getWebTablesPage();
    const first_name = testData.UserDetails[0].firstName;
    const last_name = testData.UserDetails[0].lastName;
    const age = testData.UserDetails[0].age;
    const userEmail = testData.UserDetails[0].userEmail;
    const salary = testData.UserDetails[0].salary;
    const department = testData.UserDetails[0].department;


    // Navigate to the demoqa.com website
    await page.goto(appURL);

    //Navigate to web tables page
    await elementsPage.navigateToTables();

    //Add details in the web table and click on save
    await webTablesPage.enterDetailsInWebForm(first_name, last_name, age, userEmail, salary, department);

    //Validate the form is submitted and data details getting reflected
    const returnedWebTableEntries = await webTablesPage.validateFormSubmissionWithEnteredDetails();
    const enteredWebTableEntries = [];
    enteredWebTableEntries.push(testData.UserDetails[0].firstName);
    enteredWebTableEntries.push(testData.UserDetails[0].lastName);
    enteredWebTableEntries.push(testData.UserDetails[0].age);
    enteredWebTableEntries.push(testData.UserDetails[0].userEmail);
    enteredWebTableEntries.push(testData.UserDetails[0].salary);
    enteredWebTableEntries.push(testData.UserDetails[0].department);

    //Validation to check if the entered and returned text in webtables are equal
    expect(enteredWebTableEntries == returnedWebTableEntries);


});

test('@Web TC01- Scenario B - Verify user can edit the row in a table', async ({  }) => {

    const poBase = new POBase(page);
    const elementsPage = poBase.getElementsPage();
    const webTablesPage = poBase.getWebTablesPage();
    const nameToChange = "Alden";
    const updated_firstname = testData.UserDetails[0].firstName;
    const updated_lastname = testData.UserDetails[0].lastName;



    //Launch the browser. Navigating directly to the web tables page
    await page.goto(appURL);
    await elementsPage.navigateToTables();

    //Perform name change and validate if changes get reflected
    await webTablesPage.editTableAndValidateChanges(nameToChange,updated_firstname,updated_lastname)
   
  });

test(' @Web Verify broken image', async ({  }) => {

    const poBase = new POBase(page);
    const elementsPage = poBase.getElementsPage();
    const brokenLinksPage = poBase.getBrokenLinksPage();

    // Go to the URL
    await page.goto(appURL);
  
    // Navigate to "Elements" >> "Broken Links-Images"
    await elementsPage.navigateToBrokenLinks();

    //Validate if the image is broken. Image's dimension will be 0,0 and validating the same from the array received
    const returnedBrokenImageDimensions = await brokenLinksPage.validateBrokenImage();
    expect(returnedBrokenImageDimensions[0]).toEqual(0);
    expect(returnedBrokenImageDimensions[1]).toEqual(0);
    
    
  });


test('@Web TC03 - Verify user can submit the form.', async ({  }) => {

    const poBase = new POBase(page);
    const formsPage = poBase.getFormsPage();
    const practiceFormsPage = poBase.getPracticeFormsPage();
    const firstName = testData.FormDetails[0].firstName;
    const lastName = testData.FormDetails[0].lastName;
    const userEmail = testData.FormDetails[0].userEmail;
    const userNumber =testData.FormDetails[0].userNumber;
    const dateOfBirth = testData.FormDetails[0].dateOfBirth;
    const imageName = testData.FormDetails[0].imageName;
    const currentAddress = testData.FormDetails[0].currentAddress;
    const confirmationMessage = testData.FormDetails[0].confirmationMessage;
    const studentName = firstName.concat(" ",lastName);

    // Go to the URL
    await page.goto(appURL);
  
    // Navigate to "Forms" >> "Practice Form"
    await formsPage.navigateToPracticeForm();
  
    
    // Fill out the practice form with necessary details
    await practiceFormsPage.fillPracticeForm(firstName,lastName,userEmail,userNumber,dateOfBirth,imageName,currentAddress);

    //Validate the confirmation screen with the details
    const returnedFormDetailsPostSubmit = await practiceFormsPage.validateFilledPracticeFormData();
    const filledInputFormDetails = []
    filledInputFormDetails.push(confirmationMessage);
    filledInputFormDetails.push(userNumber);
    filledInputFormDetails.push(studentName);

    //Assertions
    expect(filledInputFormDetails).toEqual (returnedFormDetailsPostSubmit);
  
  
  });

test('@Web Verify the progress bar', async ({  }) => {
    const poBase = new POBase(page);
    const widgetPage = poBase.getWidgetPage();
    const progressBarPage = poBase.getProgressBarPage();
    const validationMessage = testData.ValidationMessages[0].progressBarFinish;
    
    // Go to the URL
    await page.goto(appURL);
  
    // Navigate to "Widget" >> "Progress Bar"
    await widgetPage.navigateToProgressBarPage();
  
    // Click on "Start"
    await progressBarPage.startProgressBar();
  
    // Wait for the progress bar to reach 100% and perform assertions
    expect(await progressBarPage.validateProgressBarCompletion()).toEqual(validationMessage);
  
  });

test('@Web Verify the ToolTip', async ({  }) => {
    const poBase = new POBase(page);
    const widgetPage = poBase.getWidgetPage();
    const toolTipPage = poBase.getToolTipPage();
    const validationMessage = testData.ValidationMessages[0].LinkHoverText;

    // Go to the URL
    await page.goto(appURL);

    // Navigate to "Widget" >> "Tool Tip"
    await widgetPage.navigateToToolTipPage();

    //Hover on the tool tip
    await toolTipPage.hoverOnToolTip();

    // Wait for the tooltip to appear and validate if text matches
    expect(await toolTipPage.validateToolTip()).toEqual(validationMessage);


  });

test('@Web Verify the Drag & Drop Functionality', async ({  }) => {
    const poBase = new POBase(page);
    const interactionsPage = poBase.getInteractionsPage();
    const beforeDropTextMessage = testData.ValidationMessages[0].beforeDropText;
    const afterDropTextMessage = testData.ValidationMessages[0].afterDropText;
    
    
    // Go to the URL
    await page.goto(appURL);
  
    // Navigate to "Interactions" and then "Droppable"
    await interactionsPage.navigateToDragAndDropPage();
  
    // Get the initial text of the "Drop Here" area
    const initialDropHereText = await interactionsPage.dragAndDropElementText();
  
    // Drag the "Drag me" box and drop it onto the "Drop Here" area
    await interactionsPage.performDragAndDrop();
  
    // Get the updated text of the "Drop Here" area
    const updatedDropHereText = await interactionsPage.dragAndDropElementText();
  
    // Assertions
    expect(initialDropHereText).toBe(beforeDropTextMessage);
    expect(updatedDropHereText).toBe(afterDropTextMessage);
  
  
  });  
