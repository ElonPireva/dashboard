const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dashboard');

const Schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pass: String,
    phoneNumber: String,
    birthday: Date,
    resetPasswordCode: Number,
    resetPasswordExpires: Date,
    profile: {
        profileImg: String
    },
    products: [{
        productBarCode: Number,
        productName: String,
        productQuantity: Number,
        productPrice: Number,
        createdAt: String
    }],
});

const model = mongoose.model('UserModel', Schema, 'user_dashboard');

module.exports = model;