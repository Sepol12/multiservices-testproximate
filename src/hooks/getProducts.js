import { useState } from "react";

const getProducts = async () => {
    let dataResponse = {};

    try {
        // Obtener el userToken del localStorage
        const userToken = JSON.parse(localStorage.getItem('userData')).userToken;
        if (!userToken) {
            throw new Error('Token de usuario no encontrado en localStorage');
        }

        // Realizar la solicitud GET con el userToken adjunto
        const response = await fetch('https://serveless.proximateapps-services.com.mx/proximatetools/dev/webadmin/testproximate/getproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userToken: userToken })
        });

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const responseData = await response.json();
        if (responseData.status && responseData.data) {
            dataResponse = JSON.parse(responseData.data);
        } else {
            throw new Error('No se encontraron productos en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    return dataResponse;
}

export default getProducts;