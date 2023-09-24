const { test, expect, request } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { APiUtils } = require('../utils/ApiUtils');
const testData = JSON.parse(JSON.stringify(require('../testdata/inputdata.json')));



const APIEndpoint = "https://demoqa.com";
const fakerName = faker.internet.userName();
const isbn_value = testData.APIDetails[0].isbnValue;
let userIdvalue;
let userToken;
let userName;

test.describe('Users & Books API', () => {
    test.describe.configure({ mode: 'serial' });
test('@API Create an user', async ({ }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext);
    const requestBody = {
        userName: fakerName,
        password: 'Testuser@1234',
    };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(requestBody)
        };
        const user_creation_response = await apiUtils.sendAPIRequestAndReturnResponse(APIEndpoint.concat('/Account/v1/user'), requestOptions,'POST');

        //Assert Status Code & Assign userID Value
        expect(user_creation_response.status).toBe(201);
        expect(user_creation_response.body.username).toEqual(fakerName);
        userIdvalue = user_creation_response.body.userID;
        userName = user_creation_response.body.username;
        console.log(userIdvalue); 
        console.log(userName);     
    });

test('@API Add list of books for the created user', async({ }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext);

    const token_request_body = {
        userName: userName,
        password: 'Testuser@1234',
    };
    //Generate Token to add the book
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(token_request_body)
        };

        const token_creation_response = await apiUtils.sendAPIRequestAndReturnResponse(APIEndpoint.concat('/Account/v1/GenerateToken'), requestOptions,'POST'); 

        //Assertions and assign token value
        expect(token_creation_response.status).toBe(200);
        userToken=token_creation_response.body.token;
        console.log(token_creation_response.body.token);


        //API To add list of books for the user
        const book_request = {
            userId: userIdvalue,
            collectionOfIsbns: [
                {
                    isbn: isbn_value
                }
            ]
        }

        const requestOptions_book_addition = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken + ""
            },
            data: JSON.stringify(book_request)
        };

        const book_addition_response = await apiUtils.sendAPIRequestAndReturnResponse(APIEndpoint.concat('/BookStore/v1/Books'),requestOptions_book_addition,'POST');

        console.log(book_addition_response);

        //Assertions
        expect(book_addition_response.status).toBe(201);
        expect(book_addition_response.body.books[0].isbn).toEqual(isbn_value);

});


test('@API Remove Added Books', async ({ }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext);

    const delete_book_request = {
        isbn: isbn_value,
        userId: userIdvalue
    }

    const delete_requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + userToken + ""
        },
        data: JSON.stringify(delete_book_request)
    };


    const delete_response = await apiUtils.sendAPIRequestAndReturnResponse(APIEndpoint.concat('/BookStore/v1/Book'), delete_requestOptions,'DELETE'); 
    //Validate if the deletion is successful
    expect(delete_response.status).toBe(204);
    expect(delete_response.body).toEqual("No Content");




});


});    