import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function () {


    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [repassword, setRePassword] = useState("");
    let [error, setError] = useState("");
    let [role, setRole] = useState("Customer");

    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Password validation
        if (!password || password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (password !== repassword) {
            setError("Passwords do not match");
            return;
        }

        if (!name) {
            setError("Please enter your name");
            return;
        }

        setError("");

        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                fname: name,
                email: email,
                password: password,
                role: role,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == "success") {

                    window.localStorage.setItem("token", data.data);
                    window.localStorage.setItem("loggedIn", true);
                    if (role == "Customer") {
                        window.localStorage.setItem("isCustomer", true);
                    }
                    else if (role == "Vendor") {
                        window.localStorage.setItem("isVendor", true);
                    }
                    navigate("/");
                    window.location.reload(false);
                } else {
                    setError(data.message);
                }
            });
    };


    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <a href="/login">Log In</a>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="name"
                            className="form-control mt-1"
                            placeholder="e.g Bijay Baniya"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Retype Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Retype Password"
                            value={repassword}
                            onChange={(e) => setRePassword(e.target.value)} />

                    </div>
                    
                    <div className="form-group mt-3">
                        <label>User Type</label>
                        <select
                            className="form-control mt-1"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}                        >
                            <option value="Customer">Customer</option>
                            <option value="Vendor">Vendor</option>
                        </select>
                    </div>
                    <br/>
                    {<div className="error-message">{error}</div>}
                    <br></br>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary"
                            onClick={handleSignIn}>
                            Submit
                        </button>
                    </div>
                    <br></br>

                    

                </div>
            </form>
        </div>
    )
}