import axios from "axios";

const baseURL = 'http://localhost:4000'

let token = {headers: {
    "access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjIzODA1MDg5fQ.fm081upjJgXBNFEQeH1E7Vly6HkInhaTffgmrbQfRMo",
}}

export const getStock = async () => {
    try {
        const res = await axios.get(`${baseURL}/stock`, token);
        return res.data;
    } catch (err) {
        return null;
    }
}

export const getActivos = async () => {
    try {
        const res = await axios.get(`${baseURL}`, token);
        return res.data;
    } catch (err) {
        return null;
    }
}

export const getProducto = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/${id}`, token);
        return res.data;
    } catch (err) {
        return null;
    }
}

export const finalizarCompra = async (carrito) => {
    axios.put(`${baseURL}/finalizar-compra`, {items: carrito}, token)
    .catch(error=> {
        if (error.response) {
            console.log(JSON.stringify(error.response));
        }
    })
}

export const createProducto = async (producto) => {
    try {
        const res = await axios.post(`${baseURL}`, producto, token);
        return res.data;
    } catch (err) {
        return null;
    }
}

export const editarProducto = async (producto) => {
    try {
        const res = await axios.put(`${baseURL}`, producto, token);
        return res.data;
    } catch (err) {
        return null;
    }
}

export const activacionProducto = async (id) => {
    try {
        const res = await axios.put(`${baseURL}/activar/${id}`, null,token);
        return res.data;
    } catch (err) {
        return null;
    }
}

export const generarOrden = async (nombre, telefono, mail, precioTotal, items) => {
    try {
        const res = await axios.post(`${baseURL}/order`, {
            nombre: nombre,
            telefono: telefono,
            mail: mail,
            precioTotal: precioTotal,
            items: items
        }, token);
        return res.data;
    } catch (err) {
        return null;
    }
}