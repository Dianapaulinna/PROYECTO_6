

const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')


const usersRouter = require('./routers/users.routes')
const productsRouter = require('./routers/products.routes')



// Load environment variables
dotenv.config()

console.log("puerto", process.env.PORT)

// SERVER initialization
const app = express()

mongoose.connect( process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// MIDDLEWARE
app.use(express.json())

// ROUTERS
app.use( usersRouter )
app.use( productsRouter )

app.use( usuariosRouter )

// ROOT ROUTE
app.get('/', async(req, res) => {
    let productosEncontrados = []
    try{
        const client = new MongoClient( process.env.MONGODB_URL )
        const base_proyecto6 = client.db("Proyecto6")
        const productos = base_proyecto6.collection("productos")
        const query = productos.find({marca: "Apple"})
        const listaProductos = await query.toArray()
        console.log(listaProductos.length, "productos encontrados")


    } catch(error) {
        console.log(error)
    } finally {
        res.json({ message: 'Welcome to the express API.', result: productosEncontrados })
    }
    
})

// SERVER LISTENING
app.listen( process.env.PORT , () => {
    console.log('Server is running on port ', process.env.PORT)
})