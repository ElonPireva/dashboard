import "./NewPassword.css";
import Cookies from "js-cookie";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [respMsg, setRespMsg] = useState('');
    const refStyle = useRef('');
    const navigate = useNavigate('');

    const newPasswordReq = async (e) => {
        e.preventDefault();
        try {
            const email = sessionStorage.getItem('email');
            const resetCode = Cookies.get('resetCode');
            if (newPassword.trim() !== '' && confirmNewPassword.trim() !== '' && newPassword.trim() === confirmNewPassword.trim() && email !== null && resetCode) {
                const userData = {
                    email,
                    resetCode,
                    newPassword
                };
                const req = await axios.post('http://localhost:3000/user/newPassword', userData);
                if (req.status === 201) {
                    refStyle.current = 'green';
                    setRespMsg(req.data.msg);
                    setTimeout(() => {
                        setRespMsg('');
                        navigate('/');
                    }, 2000);
                }
            }
            else if (newPassword.trim() === '' || confirmNewPassword.trim() === '') {
                refStyle.current = 'red';
                setRespMsg('All fields are required');
                setTimeout(() => {
                    setRespMsg('');
                }, 2000);
            }
            else if (newPassword.trim() !== confirmNewPassword.trim()) {
                refStyle.current = 'red';
                setRespMsg('Password should be matched');
                setTimeout(() => {
                    setRespMsg('');
                }, 2000);
            }
            else {
                refStyle.current = 'red';
                setRespMsg('No email or code has been provided');
                setTimeout(() => {
                    setRespMsg('');
                    navigate('/forgotPassword');
                }, 2000);
            }
        }
        catch (err) {
            console.log(err);
        };
    };

    return (
        <div className="NewPassword">
            <form onSubmit={newPasswordReq} autoComplete="off">
                <h1>New password</h1>
                <input type="password" placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} />
                <input type="password" placeholder="Confirm new password" onChange={(e) => setConfirmNewPassword(e.target.value)} />
                <span style={{ color: refStyle.current, marginTop: '.5rem' }}>
                    {respMsg}
                </span>
                <button>Submit</button>
                <span className="LoginPath">
                    <Link to="/forgotPassword">Back to forgot password</Link>
                </span>
            </form>
        </div>
    )
};

export default NewPassword;