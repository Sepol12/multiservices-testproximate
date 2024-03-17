import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from './index';
import '../css/LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const url = 'https://serveless.proximateapps-services.com.mx/proximatetools/dev/webadmin/testproximate/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: username, password }),
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            // Dentro del bloque try después de realizar la solicitud
            const responseJson = await response.json();

            // Verifica si la solicitud fue exitosa y si hay datos en la respuesta
            if (responseJson.status && responseJson.data) {
                // Parsea la cadena JSON en la clave "data"
                const data = JSON.parse(responseJson.data);

                // Verifica si hay un userToken en los datos
                if (data.userToken) {
                    // Accede al userToken
                    const userData = JSON.stringify(data); // Convierte el objeto de datos a formato JSON
                    localStorage.setItem('userData', userData);
                    navigate('/dashboard');

                } else {
                    // Maneja el caso donde no hay un userToken en los datos
                    console.error('No se encontró un token de usuario en los datos de la respuesta del servidor');
                }
            } else {
                // Maneja el caso donde la solicitud no fue exitosa o no hay datos en la respuesta
                setError(responseJson.message);
            }

            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error:', error.message);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Spinner />
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1>MultiServices</h1>
            <div className="form-group">
                <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="form-input"
                    required
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;