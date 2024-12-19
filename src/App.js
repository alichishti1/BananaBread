import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Account from "./components/Account";
import Login from "./components/Login";
import React, { useState, useEffect} from "react";
import LogoutLink from "./components/LogoutLink";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogin = () => {
        localStorage.setItem('loggedIn', 'true');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        setIsLoggedIn(false);
    };
    return (
        <BrowserRouter>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="/">
                            <img src="/logo.png" alt="Banana Bread" width="80" height="60"/>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">

                        {isLoggedIn ? (
                            <>
                                <ul className="nav navbar-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/account">Account</Link></li>
                                    <li><LogoutLink onLogout={handleLogout}/></li>
                                </ul>
                            </>
                        ) : (
                            <>
                            <ul class="nav navbar-nav navbar-left">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/registration">Registration</Link></li>
                            </ul>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/account"
                    element={isLoggedIn ? <Account /> : <Login onLogin={handleLogin} />}
                />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App;