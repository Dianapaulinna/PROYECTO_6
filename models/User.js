

const fs = require('fs')
const path = require('path')

const readUsers = () => {
   
    console.log(__dirname) 
    const fileContent = fs.readFileSync(path.join(__dirname, "users.txt") , 'utf-8')

    const users = fileContent.split('\n')
    
    return users
}

module.exports = {
    readUsers
}