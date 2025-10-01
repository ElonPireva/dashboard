import 'bootstrap/dist/css/bootstrap.min.css';
import "./Profile.css";
import { useState } from 'react';
import axios from "axios";
import { decodeToken } from "react-jwt";
import { useEffect } from 'react';
import { useRef } from 'react';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const token = localStorage.getItem('token');
    const dct = decodeToken(token);
    const [resp, setResp] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [blobImage, setBlobImage] = useState('');
    const [imgResp, setImgResp] = useState('');
    const msgColorRef = useRef('');

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const fetchImage = await axios.get(`http://192.168.5.176:3000/profileImage/${dct.id}`);
                setProfilePicture(fetchImage.data.imageURL);
            }
            catch (err) {
                console.log('err', err);
            }
        }
        fetchImg();
    }, []);

    useEffect(() => {
        const getUserProfileData = async () => {
            const req = await axios.get(`http://192.168.5.176:3000/getUserProfileData/${dct.id}`);
            if (req.status === 200) {
                console.log('user profile data after request made', req);
                const username = req.data.firstName.charAt(0) + req.data.lastName.charAt(0);
                setUsername(username);
                setFirstName(req.data.firstName);
                setLastName(req.data.lastName);
                setEmail(req.data.email);
                setPhoneNumber(req.data.phoneNumber);
                setBirthday(req.data.birthday);
            }
        };
        getUserProfileData();
    }, []);

    const UpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const data = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                birthday: birthday
            };
            if (firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && birthday.trim() !== '') {
                const sendRequest = await axios.put(`http://192.168.5.176:3000/updateProfile/${dct.id}`, data);
                if (sendRequest.status === 201) {
                    setResp(sendRequest.data.msg);
                    msgColorRef.current = 'green';
                    setTimeout(() => {
                        setResp('');
                    }, 2000);
                }
            }
            else {
                setResp('All fields are required except the optional one');
                msgColorRef.current = 'red';
                setTimeout(() => {
                    setResp('');
                }, 2000);
            }
        }
        catch (err) {
            setResp(err.response.data.msg);
            msgColorRef.current = 'red';
            setTimeout(() => {
                setResp('');
            }, 2000);
        }
    };

    const uploadPhoto = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
        setBlobImage(e.target.files[0]);
    };

    const PostPicture = async (e) => {
        try {
            e.preventDefault();
            if (blobImage !== '') {
                const formData = new FormData();
                formData.append('image', blobImage);
                const req = await axios.post(`http://192.168.5.176:3000/api/uploadImage/${dct.id}`, formData);
                if (req.status === 201) {
                    setImgResp(req.data.msg);
                    msgColorRef.current = 'green';
                    setTimeout(() => {
                        setImgResp('');
                    }, 2000);
                }
            }
            else {
                setImgResp('You need to choose an image before uploading');
                msgColorRef.current = 'red';
                setTimeout(() => {
                    setImgResp('');
                }, 2000);
            }
        }
        catch (err) {
            setImgResp(err);
            msgColorRef.current = 'red';
            setTimeout(() => {
                setImgResp('');
            }, 2000);
        }
    };

    return (
        <div className='container'>
            <div className="row mt-3 justify-content-center">
                <div className="col-sm-8 col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Profile Picture
                        </div>
                        <div className="card-body text-center">
                            {profilePicture && <img
                                src={profilePicture} className="card-img-top rounded-circle mb-2"
                                alt="profile picture" style={{ height: '10rem', width: '160px' }}
                            />}
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label"></label>
                                <input className="form-control" type="file" id="formFile" onChange={uploadPhoto} />
                            </div>
                            <form className="mb-3" onSubmit={PostPicture} method="POST" encType='multipart/form-data'>
                                {profilePicture && <button className='btn btn-primary'>Upload</button>}
                                <div className='mt-3'>
                                    <span style={{ color: msgColorRef.current }}>{imgResp}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8 col-md-8 mt-sm-3 profileSecondCard">
                    <div className="card">
                        <div className="card-header">
                            Account Details
                        </div>
                        <div className="card-body">
                            <form method='POST' onSubmit={UpdateProfile}>
                                <div className="mb-3">
                                    <label htmlFor="Username" className="form-label">Username</label>
                                    <input
                                        type="username"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter your username"
                                        readOnly={true}
                                        value={username}
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="First Name" className="form-label">First name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="Enter your first name"
                                            onChange={e => setFirstName(e.target.value)}
                                            value={firstName}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="Last Name" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Enter your last name"
                                            onChange={e => setLastName(e.target.value)}
                                            value={lastName}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email address"
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="Phone Number" className="form-label">Phone number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="Enter your phone number ( optional )"
                                            onChange={e => setPhoneNumber(e.target.value)}
                                            value={phoneNumber}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="Birthday" className="form-label">Birthday</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="birthday"
                                            placeholder="Enter your birthday"
                                            onChange={e => setBirthday(e.target.value)}
                                            value={new Date(birthday).toLocaleDateString('en-CA')}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary">Save Changes</button>
                                <p className="text-center" style={{color: msgColorRef.current}}>{resp}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;