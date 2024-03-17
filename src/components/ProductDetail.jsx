import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getProducts from '../hooks/getProducts';
import { Spinner } from './index';
import '../css/ProductDetail.css';

const ProductDetail = () => {
    const { productPath } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(product)

    if (!localStorage.getItem('userData')) {
        navigate('/'); 
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const dataResponse = await getProducts();
                const productFiltered = dataResponse.products.find(product => product.path === `/${productPath}`)
                setProduct(productFiltered);
            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productPath]); // El efecto se ejecutará cada vez que cambie el ID del producto en la URL

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <div>No se encontró el producto</div>;
    }

    return (
        <div className="product-detail-container">
            <h2 className="product-title">{product.title}</h2>
            <img src={product.image} alt={product.title} className="product-image" />
            <p className="product-description">{product.longDescription}</p>
        </div>
    );
};

export default ProductDetail;
