const validation = require('../validation/users/userValidation')
const auth = require('../middlewares/auth_middleware')
const { upload } = require('../middlewares/imageStorage')
const user = require('../controller/userController')
const express = require('express');
const router = express.Router()

router.post('/signUp', upload.single("profilepic"), validation.createUservalidation, user.createUser);
router.post('/login', validation.userLoginvalidation, user.userLogin);
router.post('/resetPassword/:id/:token', auth.checkAuth, user.resetPassword)
router.post('/emailforReset', user.emailForResetPass)

module.exports = router;
