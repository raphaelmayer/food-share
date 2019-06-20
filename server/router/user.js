const express = require("express");
const controller = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/getall/:username/:gigId', controller.getCompleteUser);
router.get('/getall/:username', controller.getCompleteUser);
router.get('/:id', controller.getUser);
router.put('/:id', authMiddleware.requireOwnership, controller.updateUser);
router.delete('/:id', authMiddleware.requireOwnership, controller.deleteUser);

module.exports = router;