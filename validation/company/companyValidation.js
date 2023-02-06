const company = require('./companySchema')

module.exports = {
    createCompanyValidation: async (req, res, next) => {
        const value = await company.createCompany.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            next();
        }
    }
}
