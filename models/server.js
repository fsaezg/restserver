const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

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
        
        this.app.use( this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port );
        });
    }

}

module.exports = Server;