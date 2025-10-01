import "./ForgotPasswordCode.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ForgotPasswordCode = () => {
    const [emailCode, setEmailCode] = useState('');
    const [respMsg, setRespMsg] = useState('');
    const refStyle = useRef('');
    const navigate = useNavigate('');

    const CodeReq = async (e) => {
        e.preventDefault();
        try {
            const email = sessionStorage.getItem('email');
            if (emailCode.trim() !== '' && email !== null) {
                const req = await axios.get(`http://localhost:3000/forgotPasswordCode/user?email=${email}&code=${emailCode}`);
                if (req.status === 200) {
                    document.cookie = `resetCode=${emailCode}; path=/;`;
                    console.log(Cookies.get('resetCode'));
                    navigate('/newPassword');
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
            console.log('err when sending email code to server for verification', err);
            setRespMsg(err.response.data.msg);
            refStyle.current = 'red';
            setTimeout(() => {
                setRespMsg('');
            }, 2000);
        }
    };

    return (
        <div className="Forgot">
            <form onSubmit={CodeReq} autoComplete="off">
                <h1>Code</h1>
                <input type="text" placeholder="Code" onChange={(e) => setEmailCode(e.target.value)} />
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

export default ForgotPasswordCode;