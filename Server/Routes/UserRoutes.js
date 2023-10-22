import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../Models/UserModel'
import generateToken from '../utils/generateToken'
import protect from '../Middleware/AuthMiddleware'

const userRoute = express.Router()

//Login
userRoute.post("/login", asyncHandler(
    async(req, res) => {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                surname:user.surname,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id),
                createdAt:user.createdAt,
            })
        } else {
            res.status(401)
            throw new Error("Invalid email or password")
        }
    })
)

//Register
userRoute.post("/", asyncHandler(
    async(req, res) => {
        const {name, surname, email, password} = req.body
        const userExists = findOne({email})
        
        if (userExists){
            res.status(400)
            throw new Error("User already exists")
        }
        const user = await User.create({
            name,
            surname,
            email,
            password
        })

        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                surname:user.surname,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id),
                createdAt:user.createdAt,
            })
        } else {
            res.status(400)
            throw new Error("Invalid user data")
        }
    }
))

//Profile
userRoute.get("/profile", protect, asyncHandler(
    async(req, res) => {
        const user = await User.findById(req.user._id)
        if(user){
            res.json({
                _id:user._id,
                name:user.name,
                surname:user.surname,
                email:user.email,
                isAdmin:user.isAdmin,
                createdAt:user.createdAt,
            })
        } else {
            res.status(404)
            throw new Error("User not found")
        }
    })
)

export default userRoute