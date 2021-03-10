const express = require('express')
const cors = require('cors');
const colors = require('colors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }

        // Conectar a BD
        this.conectarDB();

        // Middlewares = Función para añadir funcionalidades
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
        
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        
        // CORS
        this.app.use( cors() );

        // Lectura y Parseo del Body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static( 'public' ) );

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto'.green, this.port.blue );
        });
    }

}

module.exports = Server;