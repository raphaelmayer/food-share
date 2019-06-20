const express = require("express");
const controller = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', authMiddleware.requireLogin, controller.login);

module.exports = router;