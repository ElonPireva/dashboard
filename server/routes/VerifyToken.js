const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.secretKey;

router.get('/', (rq, rp) => {
    const token = rq.headers['authorization'];
    if (token) {
        jwt.verify(token, secretKey, (err, result) => {
            if (err) {
                console.log(err);
                rp.statusCode = 401;
                rp.send('Fake Token');
                return;
            }
            rp.statusCode = 200;
            rp.send('Good Token');
        });
    };
});

module.exports = router;