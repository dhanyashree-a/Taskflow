import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {

        try {

           const response = await axios.post(
    "http://localhost:8080/api/auth/login",
    {
        email,
        password
    }
);

console.log(response.data);

if (!response.data.token) {
    alert(response.data.message);
    return;
}

localStorage.setItem("token", response.data.token);
localStorage.setItem("name", response.data.name);

axios.defaults.headers.common["Authorization"] =
    `Bearer ${response.data.token}`;

navigate("/");
        } catch (error) {

            alert("Invalid Email or Password!");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

              <h1>TaskFlow</h1>

<p>Organize • Track • Achieve</p>

                <div className="input-box">

                    <FaEnvelope className="icon" />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="input-box">

                    <FaLock className="icon" />

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <span
                        className="eye"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {
                            showPassword
                                ? <FaEyeSlash />
                                : <FaEye />
                        }
                    </span>

                </div>

                <button
                    className="login-btn"
                    onClick={login}
                >
                    Login
                </button>

                <div className="register-link">

                    Don't have an account?

                    <br />

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;