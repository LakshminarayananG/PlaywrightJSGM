const { test, expect, request } = require('@playwright/test');
const { faker } = require('@faker-js/faker');


//create User
const fakerName = faker.internet.userName();
const requestBody = {
    userName: fakerName,
    password: 'Testuser@1234',
};
const isbn_value = "9781449325862";
let userIdvalue;
let userToken;


test.describe('Users & Books API', () => {
    test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
        // Send a POST request
        const req = await request.newContext();
        const response = await req.post('https://demoqa.com/Account/v1/user', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(requestBody),
        });

        // Parse the response body
        const responseBody = await response.json();
        userIdvalue = await responseBody.userID;

        // Assert that the new user was created successfully
        expect(response.status(201));
        expect(responseBody.username).toEqual(fakerName);


        const response_token = await req.post("https://demoqa.com/Account/v1/GenerateToken",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(requestBody)
            });

        //Validate if token is generated successfully
        expect(await response_token.status(200));

        //Validate if token is not null
        const response_tokenBody = await response_token.json();
        expect(response_tokenBody.token).not.toBeNull();
        userToken = await response_tokenBody.token;

    });

    test('@API Add List of books for created user', async ({ }) => {
        //Generating Token before hitting the post request
        const req = await request.newContext();

        const book_request = {
            userId: userIdvalue,
            collectionOfIsbns: [
                {
                    isbn: isbn_value
                }
            ]
        }
        const book_create_response = await req.post("https://demoqa.com/BookStore/v1/Books",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + userToken + ""
                },
                data: JSON.stringify(book_request)
            });
        //Validate if the request is successful
        expect(await book_create_response.status(201));
        const book_response_body = await book_create_response.json();

    });


    test('@API Remove Added Books', async ({ }) => {
        //Generating Token before hitting the post request
        const req = await request.newContext();

        const delete_book_request = {
            isbn: "9781449325862",
            userId: userIdvalue
        }
        const delete_book_response = await req.delete("https://demoqa.com/BookStore/v1/Book",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + userToken + ""
                },
                data: JSON.stringify(delete_book_request)
            });
        //Vali88819a4f-4569-43c5-9db9-3ac9817acaefdate if the request is successful
        expect(await delete_book_response.status(204));
        expect(await delete_book_response.statusText()).toEqual("No Content");




    });





});
