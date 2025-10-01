const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const databaseModel = require('../db/DB');

let userToken;

const checkToken = (rq,rp,next) => {
    if(rq.headers['token']){
        const token = rq.headers['token'];
        jwt.verify(token, process.env.secretKey, (err,result) => {
            if(err){
                return rp.status(401).send('Can not add new product. Your token is expired or invalid try again!');
            }
            else {
                userToken = token;
                return next();
            }
        });
    }
    else {
        rp.status(401).send('You need a token to continue!');
    }
};

router.post('/', checkToken, async(rq,rp) => {
    const {productBarCode, productName, productQuantity, productPrice} = rq.body;
    const jwt_decoded = jwt.decode(userToken);
    const findUser = await databaseModel.findOne({email: jwt_decoded.email});
    try {
        if(findUser){
            const date = new Date();
            const timeStamp = date.toISOString();
            findUser.products.push({
                productBarCode: productBarCode, 
                productName: productName, 
                productQuantity: productQuantity, 
                productPrice: productPrice,
                createdAt: timeStamp
            });
            findUser.save((err, result) => {
                if(err) console.log('err when storing product in DB.');
                console.log('Product stored:', result);
                rp.status(201).send('Product added successfully!');
                return;
            });
        }
    }
    catch(err){
        console.error(err);
    }
});

module.exports = router;