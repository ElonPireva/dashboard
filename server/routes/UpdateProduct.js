const express = require('express');
const router = express.Router();
const dbModel = require('../db/DB');
const { ObjectId } = require('mongodb');

router.patch('/:id', async (rq, rp) => {
    const productId = ObjectId(rq.params.id);
    const userId = ObjectId(rq.query.userId);
    const findUser = await dbModel.findOne({ _id: userId });
    if (findUser) {
        const findProductToUpdate = findUser.products.find(product => product._id.equals(productId));
        const updatedValues = {};
        if (findProductToUpdate) {
            for (const key in rq.body) {
                if (rq.body[key] !== findProductToUpdate[key] && key !== '_id') {
                    updatedValues[`products.$.${key}`] = rq.body[key];
                }
            }
            const updatedUser = await dbModel.updateOne({"products._id": findProductToUpdate._id}, {$set: updatedValues});
        }
    }
});

module.exports = router;