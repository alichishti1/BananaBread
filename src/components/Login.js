import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Login({onLogin}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // const {setIsLoggedIn} = props;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // try {
            e.preventDefault();
            // setIsLoggedIn(true);
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userName, password})
            });
            const status = response.status;
            const responseJson = await response.json();
            console.log("responseJson", responseJson);
            if (status === 200) {
                localStorage.setItem("userId", responseJson.id);
                console.log(responseJson.id);
                onLogin();
                navigate("/");
            } else {
                alert("Incorrect credentials");
            }
    };

    return (
        <>
            <div className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        <p><a href="/">About</a></p>
                    </div>

                    <div className="col-sm-8 text-left">
                        <h1>Login Page</h1>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary btn-custom">Submit</button>
                                {/*<button type="reset" className="btn btn-danger btn-custom">Reset</button>*/}
                            </div>
                        </form>
                    </div>

                    <div className="col-sm-2 sidenav">
                        <div className="well">
                            <p>Learn more about our amazing Banana Bread! Join us at Banana Bread Co</p>
                        </div>
                        <div className="well">
                            <p>Did you know Banana's appeared in the U.S. in 1870?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;