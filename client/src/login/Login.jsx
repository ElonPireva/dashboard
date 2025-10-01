import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate('');
    const { state } = useLocation();

    const LoginReq = (e) => {
        e.preventDefault();
        if (email.trim() === '' || pass.trim() === '') {
            setErr('All fields are required');
            setTimeout(() => {
                setErr('');
            },2000);
        }
        else {
            axios.post('http://192.168.5.176:3000/login', { email: email, pass: pass }).then(resp => {
                console.log('resp', resp);
                if (resp.status === 200) {
                    localStorage.setItem('token', resp.data.token);
                    if (state) {
                        navigate(state.path);
                    }
                    else {
                        navigate('/dashboard');
                    }
                }
            }).catch(err => {
                console.log('err', err);
                setErr(err.response.data.msg);
                setTimeout(() => {
                    setErr('');
                },2000);
            });
        }
    };

    return (
        <div className="Login">
            <form onSubmit={LoginReq} autoComplete="off">
                <h1>Login</h1>
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
                <span id="errMsg">{err}</span>
                <span className="ForgotPassword">
                    <Link to="/forgotpassword">Forgot password?</Link>
                </span>
                <button>Login</button>
                <span className="Login_RegisterPath">
                    No account?
                    <Link to="/register">Register here</Link>
                </span>
            </form>
        </div>
    )
};

export default Login;