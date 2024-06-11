


const Productos = require('../models/productos')

const getAll = async() => {
   return await Productos.find({})
}

module.exports = {getAll}