const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const DIR = './storage/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({storage: storage});

router.post('/:id', upload.single('image'), async(rq,rp) => {
    console.log('request');
    const url = rq.protocol + '://' + rq.get('host');
    const user = await databaseModel.findById(rq.params.id);
    if(user){
        console.log(user.profile.profileImg);
        user.profile.profileImg = url + '/storage/' + rq.file.filename
        user.save((err, result) => {
            if(err) console.log(err);
            console.log('image stored in DB successfully', result);
            rp.status(201).send({msg: 'Image uploaded successfully'});
        });
    };
});

module.exports = router;