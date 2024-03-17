import React from 'react';
import '../css/TopBar.css';
import { useNavigate } from 'react-router-dom';
import LogoApp from '../images/LogoApp.png';

const TopBar = () => {
    const navigate = useNavigate();

    const goDashboard = () => {
        navigate('/dashboard');
    }

    const logOut = () => {
        localStorage.setItem('userData', '');
        navigate('/');
    }

    return (
        <div className="topbar">
            {/* Logo o título de la aplicación */}
            <div className="topbar-brand">
                <img onClick={() => goDashboard()} src={LogoApp} alt="Logo" className="logo" />
            </div>
            <div className="topbar-actions">
                <button onClick={() => logOut()}>Cerrar Sesión</button>
            </div>
        </div>
    );
}

export default TopBar;
