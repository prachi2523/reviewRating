const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const { transporter, mailOption } = require("../service/emailService");
const { status } = require('express/lib/response');
const user = require('../model/usermoduleSchema')
const jwt = require("jsonwebtoken")
const express = require("express");
const bcrypt = require("bcrypt")


const createUser = async (req, res) => {
    console.log(req.body)
    const userData = new user(req.body)
    const salt = await bcrypt.genSalt(10);
    const filepath = `/uploads/${req.file.filename}`
    userData.profilepic = filepath

    try {
        const isemailExist = await user.findOne({ email: req.body.email })
        if (isemailExist) {
            res.status(409).json({
                success: "failure",
                message: "email already exist"
            });
        }
        else {
            try {

                userData.password = await bcrypt.hash(req.body.password, salt);
                await userData.save();
                res.status(201).json({
                    success: "successful",
                    message: "user created succeessfully",
                });

            }
            catch (err) {
                res.status(400).json({
                    succcess: "failure",
                    message: "err " + err.message
                });
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const name='password';
        // const{[name]:removedProperty,...userRest};
        if (email && password) {
            const finduser = await user.findOne({ email: email });
            if (finduser != null) {
                const isMatch = await bcrypt.compare(password, finduser.password);
                if (finduser.email === email && isMatch) {
                    // const userdata= user.find({finduser},{projection:{password:0}})
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "8d" });

                    res.status(200).send({
                        status: "success",
                        message: "login Successful",
                        value: user,
                        token: token
                    });
                }
            }
            else {
                res.status(400).send({
                    success: "failure",
                    message: "Email or password is not valid",
                })
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

const emailForResetPass = async (req, res) => {
    const { email } = req.body
    try {
        const alreadyExist = await user.findOne({ email: email })
        if (alreadyExist != null) {
            const secretkey = alreadyExist._id + process.env.JWT_SECRET_KEY
            const token = await jwt.sign({ userID: alreadyExist._id }, secretkey, { expiresIn: '7d' });
            // console.log(token)

            const link = `http://127.0.0.1:8000/resetUserPassword/${alreadyExist._id}/${token}`;
            let info = await transporter.sendMail({
                from: "prachi.demo25@gmail.com",
                to: "prachiverma2521@gmail.com",
                subject: "password reset request",
                html: `<a href=${link}>click on this link to reset password</a>`
            });
            res.status(201).json({
                success: "success",
                message: "email sent successfully",
                token: token,
                userID: alreadyExist._id
            })

        } else {
            res.status(550).json({
                status: "failed",
                message: "this email user is not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }

}

const resetPassword = async (req, res) => {
    const id = req.params.id
    const token = req.params.token
    const newpassword = req.body.newpassword
    const confirmPass = req.body.confirmPass
    try {
        const userExist = await user.findById(id)

        if (userExist != null) {
            const secretkey = userExist._id + process.env.JWT_SECRET_KEY
            jwt.verify(token, secretkey);

            if (newpassword == confirmPass) {
                const salt = await bcrypt.genSalt(10)
                var password = await bcrypt.hash(confirmPass, salt)
                await user.findByIdAndUpdate(userExist._id,
                    { $set: { password: password } })
                res.status(200).json({
                    status: "success",
                    message: "password reset successfully"
                })
            } else {
                res.status(401).json({
                    successs: "failed",
                    message: "password doesn't match"
                })
            }
        } else {
            res.status(403).json({
                status: "failed",
                message: "user is not exist"
            })
        }

    }
    catch (error) {
        res.status(500).json({
            staus: "failed",
            message: error.message
        })
    }

}

const forgotPassword = async (req, res) => {

}

module.exports = {
    createUser,
    userLogin,
    emailForResetPass,
    resetPassword
};
