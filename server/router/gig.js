const express = require("express");
const controller = require("../controllers/gig");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/getgigs', controller.getGigs);
router.get('/:id', controller.getGig);
router.post('/', authMiddleware.requireAuth, controller.createGig);
router.put('/:id', authMiddleware.requireOwnership, controller.updateGig);
router.delete('/:id', authMiddleware.requireOwnership, controller.deleteGig);
router.post('/status/:id', authMiddleware.requireOwnership, controller.updateGigStatus);

module.exports = router;