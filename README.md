# Playwright_JS
This is a Playwright JavaScript framework for writing API and UI tests. It is designed to be easy to use and extensible, and it provides a number of features to help you write reliable and efficient tests.

# Features
* Supports both API and UI tests
* Easy to use and extensible
* Provides a number of features to help you write reliable and efficient tests, including:
    * Page objects
    * Test data management
    * Reporting

# Getting started

To get started with this framework, you will need to install Node.js and Playwright:

npm install -g node
npm install playwright

Once you have installed the dependencies, you can clone this repository and install the dependencies for the framework:

```
git clone https://github.com/LakshminarayananG/PlaywrightJSGM.git
cd PlaywrightJSGM
npm install
```

# Running the tests
To run the tests, simply execute the following command:

```
npx playwright test 
```

This will run all of the tests in the e2eTests folder

# Page objects
This framework uses page objects to represent the different pages in your application. Page objects are classes that encapsulate the elements and actions on a specific page. This makes it easier to write and maintain your tests, as you can focus on the business logic of your application, rather than the implementation details of the UI.

To create a page object, simply create a new class in the pageobjects folder. The class should extend the BasePageObject class. The BasePageObject class provides a number of common methods that you can use in your page objects, such as methods for finding elements and performing actions.

# Test data management
This framework provides a test data management system to help you manage the test data for your tests. The test data management system allows you to define test data sets and use them in your tests.

To define a test data set, create a new file in the testdata folder. The file should contain the test data in JSON format. To use a test data set in your test, simply pass the name of the test data set to the testData property of the test function.

# Reporting
To generate a report, simply execute the following command:

```
npx playwright show-report
```

# Github Actions
This project is also configured with github actions workflow which will trigger a build and run the tests everytime a code is pushed to the master / main branch.
