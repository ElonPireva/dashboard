import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [err, setErr] = useState();
    const navigate = useNavigate('');

    const RegisterReq = async (e) => {
        e.preventDefault();
        if (email === '' || pass === '' || firstName === '' || lastName === '' || birthday === '') {
            setErr('All fields are required*');
        }
        else {
            try {
                const data = {
                    firstName,
                    lastName,
                    email,
                    pass,
                    phoneNumber,
                    birthday
                };
                const registerReq = await axios.post('http://localhost:3000/register', data);
                if(registerReq.status === 201){
                    navigate('/');
                    setErr('');
                }
            }
            catch (err) {
                console.log('Register err', err);
                setErr(err.response.data.msg);
            };
            // Clear input values after form submited
            setFirstName('');
            setLastName('');
            setEmail('');
            setPass('');
            setPhoneNumber('');
            setBirthday('');
        };
    };

    return (
        <div className="Register">
            <form onSubmit={RegisterReq} autoComplete="off">
                <h1>Register</h1>
                <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} value={firstName} />
                <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} value={lastName} />
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} value={pass} />
                <input type="text" placeholder="PhoneNumber (optional)" onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} />
                <input type="date" placeholder="Birthday" onChange={e => setBirthday(e.target.value)} value={birthday} />
                <span id="errMsg">{err}</span>
                <button type="submit">Register</button>
                <span className="Register_LoginPath">
                    Already have an account?
                    <Link to="/login">Login here</Link>
                </span>
            </form>
        </div>
    )
};

export default Register;