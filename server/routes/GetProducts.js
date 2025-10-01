const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const databaseModel = require('../db/DB');

router.get('/', async (rq,rp) => {
    const token = rq.headers['token'];
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;
    const findUser = await databaseModel.findOne({email: email});
    return rp.status(200).send(findUser.products);
});

module.exports = router;