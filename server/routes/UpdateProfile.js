const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');

router.put('/:id', async (rq, rp) => {
    try {
        const userID = await databaseModel.findById(rq.params.id);
        if (userID) {
            userID.firstName = rq.body.firstName;
            userID.lastName = rq.body.lastName;
            userID.email = rq.body.email;
            userID.phoneNumber = rq.body.phoneNumber;
            userID.birthday = rq.body.birthday;

            console.log('user', userID);

            userID.save((err, result) => {
                if (err) {
                    console.log('Err when trying to update user', err);
                    rp.status(400).send({ msg: "User could not be updated for some reasons." });
                }
                console.log('User updated successfully', result);
                rp.status(201).send({ msg: "User updated successfully" });
            });
        }
    }
    catch (err) {
        console.log(err);
        rp.status(400).send({ msg: "User could not be updated for some reasons." });
    }
});

module.exports = router;