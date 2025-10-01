const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.secretKey;

router.post('/', async (rq, rp) => {
    const { email, pass } = rq.body;
    const findUserFromDB = await databaseModel.findOne({ email: email });

    if (findUserFromDB) {
        const accToken = jwt.sign({ id: findUserFromDB._id, email: findUserFromDB.email, role: 'admin', firstName: findUserFromDB.firstName, lastName: findUserFromDB.lastName, phoneNumber: findUserFromDB.phoneNumber, birthday: findUserFromDB.birthday }, secretKey, { expiresIn: '30m' });
        findUserFromDB.email === email && findUserFromDB.pass === pass
            ? rp.status(200).send({ msg: "Loged in succesfully", token: accToken }) : rp.status(401).send({ msg: "Wrong credentials" });
    }
    else {
        rp.status(400).send({ msg: "User not found" });
    }
});

module.exports = router;