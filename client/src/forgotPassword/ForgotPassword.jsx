import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('loni');
    const [respMsg, setRespMsg] = useState('');
    const refStyle = useRef('');
    const navigate = useNavigate('');

    const ForgotReq = async (e) => {
        e.preventDefault();
        try {
            if (email.trim() !== '') {
                const req = await axios.get(`http://localhost:3000/verifyEmail/user?email=${email}`);
                if (req.status === 200) {
                    setRespMsg(req.data.msg);
                    refStyle.current = 'green';
                    sessionStorage.setItem('email', email);
                    setTimeout(() => {
                        navigate(`/forgotPasswordCode`);
                    }, 2000);
                }
            }
            else {
                setRespMsg('This field is required');
                refStyle.current = 'red';
                setTimeout(() => {
                    setRespMsg('');
                }, 2000);
            }
        }
        catch (err) {
            console.log('forgot pass err', err);
            setRespMsg(err.response.data.msg);
            refStyle.current = 'red';
            setTimeout(() => {
                setRespMsg('');
            }, 2000);
        }
    };

    return (
            <div className="Forgot">
                <form onSubmit={ForgotReq} autoComplete="off">
                    <h1>Forgot Password</h1>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <span style={{ color: refStyle.current, marginTop: '.5rem' }}>
                        {respMsg}
                    </span>
                    <button>Submit</button>
                    <span className="LoginPath">
                        <Link to="/login">Back to login</Link>
                    </span>
                </form>
            </div>
    )
};

export default ForgotPassword;