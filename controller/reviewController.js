const reviewSchema = require('../model/reviewModule')
const express = require('express')

const createReview = async (req, res) => {
    //   console.log(req.body)
    try {
        const newReview = new reviewSchema(req.body)
        const addReview = await newReview.save()
        res.send({
            success: "success",
            value: newReview
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            messsage: "error" + err.messsage
        })
    }
}

const updateReview = async (req, res) => {
    const id = req.params;
    // console.log(id)
    try {
        let updatedReview = await reviewSchema.findByIdAndUpdate(id, { $set: req.body })
        await updatedReview.save()
        res.status(200).json({
            success: "success",
            message: "review updated successfully"
        })
    } catch (err) {
        res.json({
            success: "failure",
            message: "error ocurred " + err.message
        })
    }
}

const deleteReview = async (req, res) => {
    const id = req.params;
    // console.log(id)
    try {
        let review = await reviewSchema.findByIdAndDelete(id)
        res.status(200).json({
            success: "success",
            message: "review deleted successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "error occured" + err.message
        })
    }
}

const detailReview = async (req, res) => {
    const id = req.params._id
    console.log(id)
    try {
        let details = await reviewSchema.findOne({ _id: id })
            .populate({
                path: "company_id",
                select: "companyName location foundedOn city"
            }).populate({
                path: "user_id",
                select: "name profilepic city"
            })
        res.json({
            success: "success",
            data: details
        })
    } catch (err) {
        res.status(404).json({
            success: "failed",
            message: err.message
        })
    }
}

const listReview = async (req, res) => {
    try {
        let reviewList = await reviewSchema.find()
        res.json({
            success: "success",
            data: reviewList
        })
    } catch (err) {
        res.json({
            success: "failed",
            message: err.message
        })
    }
}

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    detailReview,
    listReview
}
