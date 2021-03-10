const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        // 'Usuario' como viene en el module.exports de "models/usuario".
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    // Todo lo que está antes del ", ...data" no se mostrará cuando se genere un GET.
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Categoria', CategoriaSchema );