const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');
const nodemailer = require('nodemailer');

router.get('/user', async (rq, rp) => {
    const findUserByEmail = await databaseModel.findOne({ email: rq.query.email });
    try {
        if (findUserByEmail) {
            const resp = await sendMail(rq.query.email);
            findUserByEmail.resetPasswordCode = resp.randomCode;
            findUserByEmail.resetPasswordExpires = resp.expiryTime;
            findUserByEmail.save((err, result) => {
                if (err) {
                    console.log('err', err);
                }
                if(result){
                    rp.status(200).send({msg: 'Code has been sent to your email'});
                }
            });
        }
        else {
            console.log('not existing', findUserByEmail);
            rp.status(400).send({ msg: `User with this email doesn't exist` });
        }
    }
    catch (err) {
        console.log('couldnt verify user by email', err);
    }
});


const sendMail = async (userEmail) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    // Get current time in Kosovo timezone
    const now = new Date();
    const offset = 2; // Kosovo is GMT+2
    const localTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
    const expiryTime = new Date(localTime.getTime() + 10 * 60 * 1000);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ep39170@universum-ks.org",
            pass: "elon2001",
        },
    });

    const info = await transporter.sendMail({
        from: "ep39170@universum-ks.org",
        to: userEmail,
        subject: "Link to change your password",
        text: "Hello this is the link to change your password",
        html: `This is the code: ${randomCode}`,
    });

    console.log('sent msg?', info.response);

    return { randomCode, expiryTime };
};

module.exports = router;