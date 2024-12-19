import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutLink({ onLogout }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };
    return (
        <li>
            <button onClick={handleLogout}>Logout</button>
        </li>
    );
}

export default LogoutLink;