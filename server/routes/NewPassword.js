const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');

router.post('/newPassword', async (rq, rp) => {
    try {
        const findUser = await databaseModel.findOne({ email: rq.body.email });
        if (findUser) {
            if(findUser.resetPasswordCode === parseInt(rq.body.resetCode)){
                console.log(rq.body.resetCode);
                console.log(rq.body.newPassword);
                findUser.pass = rq.body.newPassword;
                findUser.save((err, result) => {
                    if(err) console.log(err);
                    rp.status(201).send({msg: 'Password has been updated successfully'});
                }) ;
            }
        }
    }
    catch(err){
        console.log('err', err);
    }
});

module.exports = router;