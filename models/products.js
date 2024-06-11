
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 10
    },
    marca: {
        type: String,
        required: true,
        minlength: 5
    },
    precio: {
        type: Number,
        min: 0,
        required: true
    },
    existencia: {
        type: Number,
        min: 0,
        default: 0
    },
    portada: {
        type: String,
        required: false
    },
    fotos: [String],
    eliminado: Boolean,
    categoria: {
        type: String,
        required: true,
        enum: ['tecnologia', 'ropa', 'muebles', 'deportes', 'hogar']
    }
})

const Productos = mongoose.model('Inventario', productSchema)

module.exports = Productos