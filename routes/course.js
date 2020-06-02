'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { check, validationResult } = require('express-validator');

const Course = require('../db').Course;

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

/* Handler function to wrap each route. */
function asyncHandler(callbackF){
    return async(req, res, next) => {
        try {
            await callbackF(req, res, next)
        } catch(error){
            res.status(500).send(error);
        }
    }
}

//COURSE ROUTES

//WORKS!!!
// GET api/courses shows all courses, status 200
router.get('/courses',asyncHandler(async(req, res)=>{
    const courses = await Course.findAll({
        attributes: ['id', 'title', 'description', 'estimatedTime'],
    });
    res.status(200).json(courses);
}));

//WORKS!!!
// GET api/courses/:id shows one chosen course, status 200
router.get('/courses/:id', asyncHandler(async(req,res,next)=>{
    const course = await Course.findByPk(req.params.id);
    //console.log(req.params.id);

    course
        ?res.status(200).json(course)
        : res.status(404).json({message: 'Course Not found'})

}));

// POST api/courses creates a new course, sets the Location header to the URI for the course, returns no content, status 201
router.post('/courses' ,authenticateUser, asyncHandler(async(req,res,next)=>{
    let course;

    course = await Course.create(req.body);
    console.log(req.body);
    console.log(course);
    const id = course.id;
    res.location(`/courses/${id}`).status(201).end();
}));

// PUT api/courses/:id updates existing, chosen course, returns no content, status 204
router.put('/courses/:id', authenticateUser, asyncHandler(async(req,res,next)=>{
    let course;
    course = await Course.findByPk(req.params.id);
    course
        ? (await course.update(req.body),
        res.status(204).end())
        : res.status(404).json({message: 'Course Not Found'})
}));
// DELETE api/courses/:id deletes chosen course, returns no content, status 204

module.exports = router;
