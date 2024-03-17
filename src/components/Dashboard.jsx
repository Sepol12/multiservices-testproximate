import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from './index'
import getProducts from '../hooks/getProducts';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [dataResponse, setDataResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    if (!localStorage.getItem('userData')) {
        navigate('/');
    }

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setDataResponse(data);
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    const handleProductClick = (product) => {
        navigate(`/product${product.path}`);
    };

    if (loading || !dataResponse || !localStorage.getItem('userData')) { // Se verifica si loading es verdadero o si data es null
        return <Spinner />;
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="cards-container">
                {dataResponse && dataResponse.products.map(product => (
                    <div onClick={() => handleProductClick(product)} key={product.id} className="card">
                        <div className="card-header">
                            <h2>{product.title}</h2>
                        </div>
                        <div className="card-body">
                            <img src={product.image} alt={product.title} className="card-image" />
                            <p className="card-description">{product.shortDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
