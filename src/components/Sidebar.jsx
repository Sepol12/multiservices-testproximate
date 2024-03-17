import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material'; 
import getProducts from '../hooks/getProducts';
import '../css/SideBar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState([]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            console.log(data.menu)
            setMenu(data.menu);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    const handleProductClick = (product) => {
        navigate(`/product${product.redirectTo}`);
    };

    const handleToggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <div className={`sidebar ${open ? 'open' : ''}`}>
            <div>
                <h2>Productos</h2>
                <ul>
                    {menu && menu.map(item => (
                        <li key={item.id} onClick={() => handleProductClick(item)}>
                            {item.icon}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="toggle-button" onClick={handleToggleSidebar}>
                <Menu />
            </button>
        </div>
    );
};

export default Sidebar;
