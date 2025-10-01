const express = require('express');
const router = express.Router();
const databaseModel = require('../db/DB');
const { ObjectId } = require('mongodb');

router.delete('/:id', async (rq, rp) => {
    const findUserByProductId = rq.params.id;
    const user = await databaseModel.findOne({ products: { $elemMatch: { _id: ObjectId(findUserByProductId) } } });
    const updatedUser = await databaseModel.updateOne({ _id: user._id }, { $pull: { products: { _id: ObjectId(findUserByProductId) } } });
    console.log('updatedUser', updatedUser);
});

module.exports = router;