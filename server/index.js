const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use('/storage/', express.static('storage'));

const login = require('./routes/Login');
app.use('/login', login);

const register = require('./routes/Register');
app.use('/register', register);

const addProduct = require('./routes/AddProduct');
app.use('/api/v1/addproduct', addProduct);

const updateProfile = require('./routes/UpdateProfile');
app.use('/updateProfile', updateProfile);

const verifyToken = require('./routes/VerifyToken');
app.use('/verifyToken', verifyToken);

const uploadImage = require('./routes/UploadImage');
app.use('/api/uploadImage', uploadImage);

const getProfileImage = require('./routes/ProfileImage');
app.use('/profileImage', getProfileImage);

const getProducts = require('./routes/GetProducts');
app.use('/getProducts', getProducts);

const deleteProduct = require('./routes/DeleteProduct');
app.use('/deleteProduct', deleteProduct);

const updateProduct = require('./routes/UpdateProduct');
app.use('/updateProduct', updateProduct);

const getUserProfileData = require('./routes/GetUserProfileData');
app.use('/getUserProfileData', getUserProfileData);

const forgotPassword = require('./routes/ForgotPassword');
app.use('/verifyEmail', forgotPassword);

const forgotPasswordCode = require('./routes/ForgotPasswordCode');
app.use('/forgotPasswordCode', forgotPasswordCode);

const newPassword = require('./routes/NewPassword');
app.use('/user', newPassword);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});