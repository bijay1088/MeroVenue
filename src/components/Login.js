import React, { useState } from "react"

export default function (props) {

    const emailtest = "bijay1088@gmail.com";
    const passwordtest = "bijay1088";
    
    let [authMode, setAuthMode] = useState("signin")

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    
    

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter email and password");
        }
        else {
            
            if (email === emailtest && password === passwordtest) {
                console.log("Login Successful");
                
            } else {
                setError("Your email address or password is incorrect. Please verify it and Try again.");
            }
            
        }

        
    }

    const handleSignIn = (e) => {
        e.preventDefault();

        if (!email || !password || !name) {

            setError("Please enter all the fields");
        }
        else {
            setError("");
            
        }


    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Log In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign In
                            </span>
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
                            {<div className="error-message">{error}</div>}
                            
                            

                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                                Log In
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#" onClick={changeAuthMode}>password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Log In
                        </span>
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
                            value={ password}
                            onChange={(e) => setPassword(e.target.value)}                        />
                    </div>
                    {<div className="error-message">{error}</div>}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary"
                            onClick={handleSignIn}                        >
                            Submit
                        </button>
                    </div>
                   
                </div>
            </form>
        </div>
    )
}