const { transporter, mailOption } = require('./service/emailService');
const routes = require('./router/commonRoute')
const bodyparser = require('body-parser')
const express = require('express')
const cron = require("node-cron")
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
require('./model/config');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(8000, () => {
    console.log(`Server is runninng on port: ${process.env.PORT}`);
}) 
