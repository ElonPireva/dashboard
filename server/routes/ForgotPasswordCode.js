const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');

router.get('/user', async (rq,rp) => {
    const {email, code} = rq.query;
    const user = await databaseModel.findOne({email: email});
    if(user && code){
        if(user.resetPasswordCode === parseInt(code)){
            rp.status(200).send({msg: 'User can change their password'});
        }
        else {
            rp.status(422).send({msg: 'Invalid code or the code has expired'});
        }
    }
});

module.exports = router;