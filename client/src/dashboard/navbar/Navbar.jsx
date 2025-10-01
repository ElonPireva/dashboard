import { useState } from "react";
import "./Navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [dropDown, setDropDown] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const dct = decodeToken(localStorage.getItem('token'));
    const navigate = useNavigate('');

    useEffect(() => {
        if (dct.email && dct.firstName) {
            setEmail(dct.email);
            setName(dct.firstName.charAt(0));
        };
    }, []);

    const OpenDropDown = () => {
        setDropDown(!dropDown);
    };

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const GoToProfile = () => {
        navigate('/profile');
        setDropDown(false);
    };

    return (
        <div className="Navbar">
            <nav className="Navbar-nav">
                <div className="Navbar-nav-profile">
                    <div className="Navbar-nav-profile-logo" onClick={OpenDropDown}>
                        <span>{name}</span>
                        <span>{email}</span>
                    </div>
                    {dropDown && <div className="Navbar-nav-profile-dropdown">
                        <div className="Navbar-nav-profile-dropdown-myprofile" onClick={GoToProfile}>
                            <span className="Navbar-nav-profile-dropdown-myprofile-logo"><FaRegUserCircle /></span>
                            <span className="Navbar-nav-profile-dropdown-myprofile-title">My Profile</span>
                        </div>
                    </div>
                    }
                </div>
                <div className="Navbar-nav-signout">
                    <span onClick={Logout}>
                        <FaSignOutAlt title="Log Out" />
                    </span>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;