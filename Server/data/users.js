import bcrypt from 'bcryptjs'

const users = [
    {
        name:"Klaudia",
        surname:"Jedryszczak", 
        email:"cvtrvs@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name:"Paweł",
        surname:"Nowak", 
        email:"example@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
]

export default users