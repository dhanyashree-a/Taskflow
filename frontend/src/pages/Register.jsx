import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function Register() {

    const navigate = useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);

    const register=async()=>{

        try{

            await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Registration Successful!");

            navigate("/login");

        }catch{

            alert("Registration Failed!");

        }

    };

    return(

        <div className="register-page">

            <div className="register-card">

                <h1>TaskFlow</h1>

                <p>Create your account</p>

                <div className="input-box">

                    <FaUser className="icon"/>

                    <input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                </div>

                <div className="input-box">

                    <FaEnvelope className="icon"/>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                </div>

                <div className="input-box">

                    <FaLock className="icon"/>

                    <input
                        type={showPassword?"text":"password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <span
                        className="eye"
                        onClick={()=>setShowPassword(!showPassword)}
                    >
                        {
                            showPassword
                            ? <FaEyeSlash/>
                            : <FaEye/>
                        }
                    </span>

                </div>

                <button
                    className="register-btn"
                    onClick={register}
                >
                    Create Account
                </button>

                <div className="login-link">

                    Already have an account?

                    <br/>

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;