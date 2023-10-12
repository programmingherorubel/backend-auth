const express = require('express')
const { loginUserPost, registerUserPost } = require('../Controller/userController')

const router = express.Router()

    router.post('/login',loginUserPost)
    router.post('/register',registerUserPost)

module.exports = router 