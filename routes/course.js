'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { check, validationResult } = require('express-validator');

const Course = require('../db/models/course');

const User = require('../db/models/user');

// Construct a router instance.
const router = express.Router();

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
// GET api/courses shows all courses, status 200
router.get('/courses',asyncHandler(async(req, res)=>{
    const courses = await Course.findAll({
        attributes: ['id', 'title', 'description', 'estimatedTime'],
    });
    res.status(200).json(courses);
}));
// GET api/courses/:id shows one chosen course, status 200
// POST api/courses creates a new course, sets the Location header to the URI for the course, returns no content, status 201
// PUT api/courses/:id updates existing, chosen course, returns no content, status 204
// DELETE api/courses/:id deletes chosen course, returns no content, status 204

module.exports = router;
