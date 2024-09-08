const express = require('express')
const router = express.Router()
const connection = require('../../dbconnect')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const nodeMailer = require('nodemailer')
require('dotenv').config()

router.use(cors())

var SECRET_KEY = process.env.SECRET_KEY
var checkToken = require('./checkToken')

// Route to get all posts
router.get("/api/users", (req, res) => {
    connection.query("SELECT * FROM posts", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

router.get('/users', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERRO: Route Protegida')
            res.sendStatus(403)
        } else {
            //If token is successfully verified, we can send the autorized data
            connection.query(
                'Select * from users',
                function (error, results, fields) {
                    if (err) {
                        throw err
                    }
                    if (results.length > 0) {
                        res.send(results)
                    } else {
                        res.send('nodata')
                    }
                }
            )
        }
    })
})