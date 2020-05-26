'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { check, validationResult } = require('express-validator');

const User = require('../db/models/user');

// Construct a router instance.
const router = express.Router();

//USER ROUTES
// GET api/users shows the current authenticate user, status 200
router.get('/users',(req,res)=>{
    res.status(200).json({ "working": "fine" });
});
// POST api/users creates new user, sets the Location header to / and returns no content, status 201


module.exports = router;
