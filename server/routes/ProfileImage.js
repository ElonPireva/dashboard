const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');

router.get('/:id', async(rq,rp) => {
    const findUser = await databaseModel.findById(rq.params.id);
    console.log('received again request');
    if(findUser){
        rp.status(201)
        .set('Cache-Control', 'max-age=5')
        .send({imageURL: findUser.profile.profileImg});
    }
});

module.exports = router;