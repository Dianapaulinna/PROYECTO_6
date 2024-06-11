


const express = require('express')

const router = express.Router()

const userController = require('../controllers/users.controller')


router.get('/users', (req, res) => {
    
    const users = userController.getAllUsers()
    
    const finalUsers = userView.userList(users)
    
    
    res.json({
        error: false,
        result: finalUsers
    })
})


router.post('/users', (req, res) => {
    console.log(req.body)
    res.json({ message: 'User created', data: req.body})
})


router.put("/users", (req, res) => {
    const edad = req.body.edad
    res.json({ message: `Tu nueva edad es ${edad}` })
})


router.delete("/users/:id", (req, res) => {
    const id = req.params.id
    res.json({ message: `Usuario con ID ${id} eliminado` })
})


module.exports = router