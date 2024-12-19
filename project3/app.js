const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./logger/logger');
const registerLoginCredentials = require("./services/registerService");
const validateLoginCredentials = require("./services/loginService");
const {getAccountDetails, createAccountDetails, updateAccountDetails} = require("./services/accountService");
const port = 8080;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({
    extended: true
}));

app.use(
    (request, response, next) => {
        logger.info("A new request received at " + new Date(Date.now()));
        next();
    }
);

app.use(express.json())
app.use(cors());

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

app.get('/account', (request, response) =>
    getAccountDetails(request, response));

app.post('/account', (request, response) =>
    createAccountDetails(request, response));

app.put('/account', (request, response) =>
    updateAccountDetails(request, response));

app.listen(port, () => {
    console.log(`Tutorial app listening on port ${port}`);
});