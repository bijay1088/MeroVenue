import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

export default function (props) {

    const { state } = useLocation();
    const { href } = state || {};

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [role, setRole] = useState("Customer");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter email and password");
        }
        else {

            fetch("http://localhost:5000/login", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    role: role
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status == "success") {
                        setError("");
                        window.localStorage.setItem("token", data.data);
                        window.localStorage.setItem("loggedIn", true);
                        if (role == "Admin") {
                            window.localStorage.setItem("isAdmin", true);
                        }
                        if (role == "Vendor") {
                            window.localStorage.setItem("isVendor", true);
                        }
                        if (href) {
                            window.location.href = href;
                            
                        }
                        else {
                            navigate("/");
                            window.location.reload(false);

                        }
                        
                        
                         
                    }
                    else {
                        setError(data.message);

                    }
                }

            )

        }


    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Log In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <a href="/register">Sign In</a>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        
                    </div>

                    <div className="form-group mt-3">
                        <label>User Type</label>
                        <select
                            className="form-control mt-1"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}                        >
                            <option value="Customer">Customer</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <br/>
                    {<div className="error-message">{error}</div>}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                            Log In
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#" >password?</a>
                    </p>
                </div>
            </form>
        </div>
    )

}