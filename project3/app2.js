const express = require('express');
const app = express();
const cors = require('cors');
const registerLoginCredentials = require("./services/registerService");
const validateLoginCredentials = require("./services/loginService");
const {getAccountDetails, createAccountDetails} = require("./services/accountService");
const port = 8080;

//Simple request time logger
app.use(
    (request, response, next) => {
        console.log("A new request received at " + new Date(Date.now()));
        next();
    }
);

app.use(express.json())
app.use(cors());

app.get('/', (request, response) => {
    response.send("Hello world!");
});

// Express route to handle fetching account details
app.get('/account', (request, response) =>
    getAccountDetails(request, response));
// app.get('/account', (request, response) => {
//     // Mock data, in real use this would come from a database
//     const accountDetails = {
//         firstname: 'John',
//         lastname: 'Doe',
//         address1: '123 Main St',
//         address2: 'Apt 4B',
//         city: 'Anytown',
//         state: 'CA',
//         zip: '12345',
//         phone: '555-1234',
//     };
//     response.json(accountDetails); // Send back the account details as JSON
// });

app.post('/login', (request, response) => {
    console.log(request.body);
    validateLoginCredentials(request, response);
    // response.status(200).json({message: "Successful Login", id:1});
});
app.post('/registration', (request, response) => {
    console.log(request.body);
    /*
    Return 201 and return the primary key of the newly created user account.
    Return 409 if that username already has a user account.
     */
    registerLoginCredentials(request, response);
    // response.status(201).json({message: "Successful Registration", id:2});
});

app.post('/account', (request, response) =>
    createAccountDetails(request, response));

app.post('/account', (request, response) => {
    console.log(request.body);
    response.status(200).json({message: "Successful Account", id:3});
});

app.listen(port, () => {
    console.log(`Tutorial app listening on port ${port}`);
});