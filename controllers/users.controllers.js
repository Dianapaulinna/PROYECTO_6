

const userModel = require('../models/users.model')


const getAllUsers = () => {
    
    const users = userModel.readUsers()
    
    const formattedUsers = users.map( user => {
        return { 
            name: user,
            createdAt: new Date()
        }
    } )
    return formattedUsers
}

module.exports = {getAllUsers}