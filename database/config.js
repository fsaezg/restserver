const mongoose = require('mongoose');
const colors = require('colors');


const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de Datos online'.green);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la Base de Datos'.red);
    }

}

module.exports = {
    dbConnection
}