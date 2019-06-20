const express = require("express");
const controller = require("../controllers/message");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/', authMiddleware.requireOwnership, controller.getMessages);
router.get('/inbox', authMiddleware.requireOwnership, controller.getInbox);
router.get('/outbox', authMiddleware.requireOwnership, controller.getOutbox);
router.post('/', authMiddleware.requireAuth, controller.createMessage);
router.get('/updateReadStatus/:id', controller.updateReadStatus);

module.exports = router;