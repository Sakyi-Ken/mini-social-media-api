const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/authController');


/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     description: Signup a new user
 *     parameters:
 *       - name: first_name
 *         in: body
 *         required: true
 *         type: string
 *       - name: last_name
 *         in: body
 *         required: true
 *         type: string
 *       - name: username
 *         in: body
 *         required: true
 *         type: string
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone_number
 *         in: body
 *         required: false
 *         type: string
 *       - name: date_of_birth
 *         in: body
 *         required: false
 *         type: string 
 *
 *     responses:
 *      201:
 *        description: User created successfully
 * *      400:
 *       description: Bad request, user already exists or missing fields
 * *      500:
 *       description: Internal server error
 * *     produces:
 * *       - application/json
 *     consumes:
 * *       - application/json   
 * */

// @route    POST /api/auth/signup
// @desc     Register a new user
// @access   Public
router.post('/signup', signUp);


// @route    POST /api/auth/login
// @desc     Login a user
// @access   Public
router.post('/login', login);


module.exports = router;