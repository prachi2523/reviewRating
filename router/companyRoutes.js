const validation = require('../validation/company/companyValidation')
const company = require('../controller/companyController')
const { upload } = require('../middlewares/imageStorage')
const express = require("express");
const router = express.Router()

router.post("/create", upload.single('company_logo'), validation.createCompanyValidation, company.createCompany);
router.get("/list", company.getCompany);
router.get("/details/:_id", company.companyReviewComment);

module.exports = router;
