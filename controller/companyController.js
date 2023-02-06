const company = require('../model/companyModuleSchema')
const reviewAndRating = require('../model/reviewModule')
const express = require("express");


const createCompany = async (req, res) => {
    const companyData = new company(req.body)
    const filepath = `/uploads/${req.file.filename}`
    companyData.company_logo = filepath


    try {
        const isCompanyExist = await company.findOne({ companyName: req.body.companyName })
        if (isCompanyExist) {
            res.status(400).json({
                status: "failed",
                message: "Company already exist"
            })
        } else {
            try {
                const comp = await companyData.save()
                res.status(200).json({
                    status: "successful",
                    message: "created succesfully",
                    value: companyData
                })
            } catch (err) {
                res.status(400).json({
                    status: "failed",
                    message: "error Occured" + err.message
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const getCompany = async (req, res) => {
    try {
        var companySort = { companyName: 1 }
        var CompanyList = await company.find().sort(companySort);
        res.status(200).send({
            success: "success",
            data: CompanyList
        })
    } catch (err) {
        res.send({
            success: "failure",
            message: "error occured" + err.message
        })
    }
}

const companyReviewComment = async (req, res) => {
    // console.log(req.body);
    let id = req.params.id
    try {
        const companyDetails = await company.findById(id)
        const comment = await reviewAndRating.find({ company_id: `${id}` })
            .populate({
                path: "user_id",
                select: "name profilepic",
            }).populate({
                path: "company_id",
                select: "_id"
            });
        const companyNameAndcomment = {
            companyName: companyDetails,
            comment: comment
        }
        return res.status(200).json({
            success: "success",
            message: companyNameAndcomment,
        });
    } catch (err) {
        res.status(500).json({
            success: "success",
            Error: err.message
        })
    }
}

module.exports = {
    createCompany,
    getCompany,
    companyReviewComment
};
