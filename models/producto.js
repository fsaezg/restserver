const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
});

ProductoSchema.methods.toJSON = function() {
    // Todo lo que está antes del ", ...data" no se mostrará cuando se genere un GET.
    const { __v, disponible, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Producto', ProductoSchema );