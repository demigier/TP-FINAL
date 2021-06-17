import jwt from 'jsonwebtoken';
import express from 'express';
var auth = express.Router();

export const verificarToken = (req, res, next)=>{
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, 'megustanlasmilanesas', (err, decoded) => {      
        if (err) {
          return res.status(404).json({ mensaje: 'Token inválido' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.status(500).send({ 
          mensaje: 'Token no proveída.' 
      });
    }
}

auth.post('/', (req, res) => {
    if(req.body.user === "admin" && req.body.pass === "admin") {
        const payload = {
            check:  true
        };
        const token = jwt.sign(payload, 'megustanlasmilanesas'/*, {
            expiresIn: 1440
        }*/);
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})

export default auth;