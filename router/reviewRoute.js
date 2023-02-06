const validation = require('../validation/review/reviewvalidation')
const review = require('../controller/reviewController')
const express = require('express')
const router = express.Router()

router.post("/add", validation.review, review.createReview)
router.put("/update/:_id", validation.updateReviewvalidation, review.updateReview)
router.delete("/delete/:_id", review.deleteReview)
router.get('/details/:_id', review.detailReview)
router.get('/list', review.listReview)

module.exports = router;