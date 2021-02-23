const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');




const usuariosGet = async(req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPost= async(req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut= async(req, res = response) => {

    const {id} = req.params;
    // Todo los parametros dentro del objeto {} antes del ...resto quedan excluidos del PUT
    const { _id, password, google, ...resto } = req.body;

    // TODO: Validar contraseña Base de Datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario)
}

const usuariosDelete= async(req, res = response) => {

    const { id } = req.params;

    // Borrar datos físicamente - No Recomendado
        // const usuario = await Usuario.findByIdAndDelete( id );
        // res.json(usuario);
    
    // Dejar inactivo a usuario - Eliminación no física - Recomendado
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    res.json(usuario);



}

const usuariosPatch= (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
