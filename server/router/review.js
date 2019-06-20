const express = require("express");
const controller = require("../controllers/review");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/get/:gigId', controller.getReviews);
router.post('/', authMiddleware.requireAuth, controller.createReview);
router.put('/:id', authMiddleware.requireOwnership, controller.updateReview);
router.delete('/:id', authMiddleware.requireOwnership, controller.deleteReview);

module.exports = router;