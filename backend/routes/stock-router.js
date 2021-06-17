import express from 'express';
var stockRouter = express.Router();
import data from '../api/server.js';
import BSON from 'bson';
import stockCtrl from '../controllers/stock-controller.js';

import {verificarToken} from '../routes/authentication.js';

stockRouter.get('/', verificarToken, stockCtrl.getActivos);

stockRouter.get('/stock',verificarToken, stockCtrl.getStock);

stockRouter.get('/:id',verificarToken, stockCtrl.getProducto);

stockRouter.post('/',verificarToken, stockCtrl.createProducto);

stockRouter.put('/finalizar-compra',verificarToken, stockCtrl.finalizarCompra);

stockRouter.put('/',verificarToken, stockCtrl.editarProducto);

stockRouter.put('/activar/:id',verificarToken, stockCtrl.activarProducto);

stockRouter.post('/order', verificarToken, stockCtrl.generarOrden);

export default stockRouter;