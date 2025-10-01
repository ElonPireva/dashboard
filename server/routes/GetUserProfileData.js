const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');

router.get('/:id', async (rq,rp) => {
    try {
        const user = await databaseModel.findById(rq.params.id);
        if(user){
            rp.status(200).send({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                pass: user.pass,
                phoneNumber: user.phoneNumber,
                birthday: user.birthday,
            });
        }
    }
    catch(err){
        console.log('err when looking for user profile data', err);
    }
});

module.exports = router;