import data from '../api/server.js';
import BSON from 'bson';

const stockCtrl = {};

stockCtrl.getStock = async (req, res) => {
    data.stock.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(result));
        }
    })
}

stockCtrl.getActivos = async (req, res) => {
    data.stock.find({activo: true}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(result));
        }
    })
}

stockCtrl.getProducto = async (req, res) => {
    try {
        if(req.params.id){
            const searchedID = BSON.ObjectId(req.params.id);
            data.stock.findOne({ "_id": searchedID }).then(result =>{
                if (result) {
                    res.send(JSON.stringify(result));
                } else {
                    console.log(result)
                    res.send({ msg: `Bebida inexistente` })
                }
            })
        }else{
            throw Error;
        }
    }
    catch (err) {
        res.status(404).json({
            result: "ERROR: No se encontró un producto con ese id. ",
            data: null,
        });
    }
}

stockCtrl.createProducto = async (req, res) => {
    try {
        const r = req.body;
        if(r.nombre && r.descrip && r.precio && r.precio > 0 && r.stock && r.stock > 0){
            data.stock.findOne({ "nombre": r.nombre }).then(searchedProduct =>{
                if (searchedProduct) {
                    res.status(500).json({
                        result: "ERROR: bebida ya existente.",
                        data: null,
                    });
                } else {
                    if (r.nombre && r.descrip && r.precio && r.stock) {
                        data.stock.insert({ nombre: r.nombre, descrip: r.descrip, precio: r.precio, stock: r.stock, activo: true }).then(function (err, result) {
                            res.send({msg: 'Producto añadido con exito'});
                        })
                    } else {
                        res.status(404).json({
                            result: `ERROR: no debe quedar ningun parametro vacio`,
                            data: null,
                        });
                    }
                }
            })
        }else{
            throw Error;
        }

    }
    catch (err) {
        res.status(404).json({
            result: `ERROR: ocurrio un error`,
            data: null,
        });
    }
}

stockCtrl.finalizarCompra = async (req, res) => {
    try {
        if(req.body.items.length > 0){
            const r = req.body;
            
            r.items.forEach(item => {
                if(item.cant && item.cant > 0 && item.id){
                    const searchedID = BSON.ObjectId(item.id);
                    data.stock.findOne({ "_id": searchedID }).then(result =>{
                        if (result) {
                            const anteriorStock = result.stock;
                            const newStock = anteriorStock - item.cant;
            
                            data.stock.updateOne({"_id": searchedID}, {"$set": {"stock": newStock}});
                        }else{
                            throw new Error('id_invalido')
                        }
                    })
                }
            });
            res.status(200).send({msg: "Compra realizada con exito"})
        }else{
            throw Error;
        }

    }
    catch (err) {
        if(err.message == 'id_invalido' || err.name == 'id_invalido'){
            res.status(404).json({
                result: "ERROR: id invalido",
                data: null,
            });
        }else{
            res.status(500).json({
                result: "ERROR: ocurrio un error",
                data: null,
            });
        }
    }
}

stockCtrl.editarProducto = async (req, res) => {
    try {
        const r = req.body;
        if(r.nombre && r.descrip && r.precio && r.precio > 0 && r.stock && r.stock > 0){
            const searchedID = BSON.ObjectId(r.id);
            data.stock.findOne({ "_id": searchedID }).then(result =>{
                if (result) {   
                    data.stock.updateOne({"_id": searchedID}, {"$set": {"nombre": r.nombre, "descrip": r.descrip, "precio": r.precio, "stock": r.stock}}).then(()=>{
                        res.status(200).send({msg: 'Producto editado con exito'});
                    })
                }else{
                    res.status(404).json({
                        result: "ERROR: No se encontró un producto con ese id. ",
                        data: null,
                    });
                }
            });
        }else{
            throw Error;
        }

    }
    catch (err) {
        res.status(500).json({
            result: "ERROR: ocurrio un error",
            data: null,
        });
    }
}

stockCtrl.activarProducto = async (req, res) => {
    try {
        if(req.params.id){
            const searchedID = BSON.ObjectId(req.params.id);
            data.stock.findOne({ "_id": searchedID }).then(result =>{
                if (result) {
                    data.stock.updateOne({"_id": searchedID}, {"$set": {"activo": !result.activo}}).then(() =>{
                        res.status(200).send({msg: 'Producto modificado con exito'});
                    })
                } else {
                    console.log(result)
                    res.send({ msg: `Bebida inexistente` })
                }
            })
        }else{
            throw Error;
        }        
    }
    catch (err) {
        res.status(404).json({
            result: "ERROR: No se encontró un producto con ese id. ",
            data: null,
        });
    }
}

stockCtrl.generarOrden = async (req, res) => {
    try {
        const r = req.body;
        if(r.items.length > 0 && r.nombre && r.mail && r.telefono && r.precioTotal){
            r.items.forEach(item => {
                if (!item.id || !item.cant) {
                    throw new Error('item_invalido');
                }
            });
            data.ordenes.insert({ nombre: r.nombre, mail: r.mail, telefono: r.telefono, precioTotal: r.precioTotal, items: r.items }).then(function (err, result) {
                res.send({msg: 'Orden generada con exito'});
            })
        
        }else{
            throw Error;
        }

    }
    catch (err) {
        if(err.message == 'item_invalido' || err.name == "item_invalido"){
            res.status(500).json({
                result: `ERROR: item invalido`,
                data: null,
            });
        }else{
            res.status(404).json({
                result: `ERROR: ocurrio un error`,
                data: null,
            });
        }
    }
}

export default stockCtrl;