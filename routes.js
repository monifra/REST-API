'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { check, validationResult } = require('express-validator');

// Construct a router instance.
const router = express.Router();

//USER ROUTES
// GET api/users shows the current authenticate user, status 200
// POST api/users creates new user, sets the Location header to / and returns no content, status 201
//COURSE ROUTES
// GET api/courses shows all courses, status 200
// GET api/courses/:id shows one chosen course, status 200
// POST api/courses creates a new course, sets the Location header to the URI for the course, returns no content, status 201
// PUT api/courses/:id updates existing, chosen course, returns no content, status 204
// DELETE api/courses/:id deletes chosen course, returns no content, status 204
