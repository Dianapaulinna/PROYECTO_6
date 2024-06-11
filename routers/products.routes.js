


const express = require('express')
const router = express.Router()
const productosController = require('../controllers/productos.controllers')


router.get('/productos', async(req, res) => {
    const productos = await productosController.getAll()
    res.json(productos)
})

router.post('/productos', async(req, res) => {
    const productos = await productosController.post()
    res.json(productos)
})

router.put('/productos', async(req, res) => {
    const productos = await productosController.put()
    res.json(productos)
})

router.delete('/productos', async(req, res) => {
    const productos = await productosController.delete()
    res.json(productos)
})
module.exports = router