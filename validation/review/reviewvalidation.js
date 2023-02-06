const review = require("./reviewSchema")

module.exports = {
    review: async (req, res, next) => {
        const value = await review.addReview.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            next()
        }
    },
    updateReviewvalidation: async (req, res, next) => {
        const value = await review.updateReview.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            next()
        }
    },
}