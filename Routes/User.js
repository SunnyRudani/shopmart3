const express = require("express");
const router = express.Router();
const { ensureAuthorized } = require('../middleware/auth')

const userController = require("../Controllers/UserController");

router.post('/login', (req, res) => userController.user.login(req, res))

router.post('/register', (req, res) => userController.user.register(req, res))

router.post('/activateuser', (req, res) => userController.user.activateUser(req, res))

router.post('/forgetPassword', (req, res) => userController.user.forgetPassword(req, res))

router.post('/verifyOtpCode', (req, res) => userController.user.verifyOtpCode(req, res))

router.post('/changePassword', (req, res) => userController.user.changePassword(req, res))
router.get('/get', (req, res) => userController.user.get(req, res))

module.exports = router;