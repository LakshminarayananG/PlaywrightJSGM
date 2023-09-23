const { test, expect } = require('@playwright/test');


test('@Web TC01- Scenario A - Verify user can enter new data into the table', async ({ page }) => {

    // Navigate to the demoqa.com website
    await page.goto('https://demoqa.com/');
    

    // Navigate to "Elements" and click on Web Tables Element
    await page.click('text=Elements');
    await page.click('text=Web Tables');

    // Click on the "Add" and fill in the details
    await page.click('#addNewRecordButton');
    await page.fill('input[id="firstName"]', 'Alden');
    await page.fill('input[id="lastName"]', 'Cantrell');
    await page.fill('input[id="age"]', '30');
    await page.fill('input[id="userEmail"]', 'test@test.com');
    await page.fill('input[id="salary"]', '12345');
    await page.fill('input[id="department"]', 'QA');

    // Click the "Submit" button and wait for confirmation message
  await page.click('#submit');
  

  // Have indexed with 4 in the locator since by default, it would be appended in the end
  const firstNameText = await page.textContent('//div[@class="rt-tr-group"][4]//div[@role="row"]//div[1]');
  const lastNameText = await page.textContent("//div[@class='rt-tr-group'][4]//div[@role='row']//div[2]");
  const ageText = await page.textContent("//div[@class='rt-tr-group'][4]//div[@role='row']//div[3]");
  const emailText = await page.textContent("//div[@class='rt-tr-group'][4]//div[@role='row']//div[4]");
  const salaryText = await page.textContent("//div[@class='rt-tr-group'][4]//div[@role='row']//div[5]");
  const departmentText = await page.textContent("//div[@class='rt-tr-group'][4]//div[@role='row']//div[6]");

  expect(firstNameText).toBe('Alden');
  expect(lastNameText).toBe('Cantrell');
  expect(ageText).toBe('30');
  expect(emailText).toBe('test@test.com');
  expect(salaryText).toBe('12345');
  expect(departmentText).toBe('QA');

});