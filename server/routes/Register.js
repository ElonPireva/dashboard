const express = require('express');
const router = express.Router(); 
const databaseModel = require('../db/DB');
const moment = require('moment');

router.post('/', async (rq, rp) => {
    try {
        const { firstName, lastName, email, pass, phoneNumber, birthday } = rq.body;
        const findUser = await databaseModel.findOne({ email: email });

        if (findUser) {
            console.log('found this user', findUser);
            rp.status(403).send({ msg: 'This user already exists' });
        }
        else {
            const birthdayDate = moment(birthday, 'YYYY-MM-DD').toDate();
            const userDocument = await databaseModel.create({
                firstName,
                lastName,
                email,
                pass,
                phoneNumber,
                birthday: moment(birthdayDate).format('YYYY-MM-DD')
            });

            userDocument.save((err, result) => {
                if (err) return;
                console.log('user stored in db successfully', result);
                rp.status(201).send({ msg: "User has been created successfully" });
            });
        }
    }
    catch (err) {
        console.log(err);
    };
});

module.exports = router;