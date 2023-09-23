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

test('@Web TC01- Scenario B - Verify user can edit the row in a table', async ({ page }) => {

  //Launch the browser. Navigating directly to the web tables page
  await page.goto("https://demoqa.com/webtables")

  // Navigating to the rows and validting if the first name is Aldren, and if yes, click on Edit
  const total_rows = (await page.locator("//div[@class='rt-tbody']//div[@role='rowgroup']").all()).length;

  for (let index = 1; index < total_rows; index++) {
    const first_name = await page.locator("//div[@class='rt-tr-group'][" + index + "]//div[@role='row']//div[1]").first().textContent();

    if (first_name == "Alden") {
      await page.locator("//div[@class='rt-tr-group'][2]//div[@role='row']//span[1]").click();
      await page.fill('input[id="firstName"]', 'Gerimedica');
      await page.fill('input[id="lastName"]', 'BV');
      await page.click('#submit');

      // Validate if the name changes get reflected
      const updated_firstname = await page.locator("//div[@class='rt-tr-group'][" + index + "]//div[@role='row']//div[1]").first().textContent();
      const updated_lastname = await page.locator("//div[@class='rt-tr-group'][" + index + "]//div[@role='row']//div[2]").first().textContent();
      expect(updated_firstname).toEqual("Gerimedica");
      expect(updated_lastname).toEqual("BV");
      break;
    }
  }
});


test(' @Web Verify broken image', async ({ page }) => {
  // Go to the URL
  await page.goto('https://demoqa.com/');

  // Navigate to "Elements" >> "Broken Links-Images"
  await page.click('text=Elements');
  await page.click("//span[text()='Broken Links - Images']");

  // Get the broken image
  const brokenImage = await page.locator("//p[text()='Broken image']/following-sibling::img").boundingBox();

  // Assert that the image is broken
  expect(brokenImage['height']).toBe(0);
  expect(brokenImage['width']).toBe(0);

  // Adding check to find the height of the valid image
  const validImage = await page.locator("//p[text()='Valid image']/following-sibling::img").first().boundingBox();
  console.log("Height of valid image is: " + validImage['height'])
});