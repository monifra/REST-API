'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { check, validationResult } = require('express-validator');

const User = require('../db').User;

// Construct a router instance.
const router = express.Router();

// Authenticate User Middleware
const authenticateUser =  async (req, res, next) => {

    let message = null;

    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);

    // If the user's credentials are available...
    if (credentials) {
        // Attempt to retrieve the user from the data store
        // by their username (i.e. the user's "key"
        // from the Authorization header).
        const user = await User.findOne({
            where: {emailAddress: credentials.name}
        });

        // If a user was successfully retrieved from the data store...
        if (user) {
            // Use the bcryptjs npm package to compare the user's password
            // (from the Authorization header) to the user's password
            // that was retrieved from the data store.
            const authenticated = bcryptjs
                .compareSync(credentials.pass, user.password);


            // If the passwords match...
            if (authenticated) {
                console.log(`Authentication successful for username: ${user.emailAddress}`);

                // Then store the retrieved user object on the request object
                // so any middleware functions that follow this middleware function
                // will have access to the user's information.
                req.currentUser = user;
            } else {
                message = `Authentication failure for username: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    // If user authentication failed...
    if (message) {
        console.warn(message);

        // Return a response with a 401 Unauthorized HTTP status code.
        res.status(401).json({ message: 'Access Denied' });
    } else {
        // Or if user authentication succeeded...
        // Call the next() method.
        next();
    }
};


//USER ROUTES
// GET api/users shows the current authenticate user, status 200
router.get('/users', authenticateUser,(req,res)=>{
    const user = req.currentUser;

    res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
});
// POST api/users creates new user, sets the Location header to / and returns no content, status 201
// Route that creates a new user.
router.post('/users', [
    check('firstName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "firstName"'),
    check('lastName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "lastName"'),
    check('emailAddress')
        .isEmail()
        .withMessage('Please provide valid "emailAddress"')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "emailAddress"'),
    check('password')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "password"'),
], async (req, res) => {
        // Attempt to get the validation result from the Request object.
        const errors = validationResult(req);

        // If there are validation errors...
        if (!errors.isEmpty()) {
            // Use the Array `map()` method to get a list of error messages.
            const errorMessages = errors.array().map(error => error.msg);

            // Return the validation errors to the client.
            return res.status(400).json({ errors: errorMessages });
        }

        // Get user req body
        const user = await req.body;

        // Hash the new user's password.
        user.password = bcryptjs.hashSync(user.password);


        // Add the user to the `users` array.
        await User.create(user);

        // Set the status to 201 Created and end the response.
        return res.location(`/`).status(201).end();

});
module.exports = router;
