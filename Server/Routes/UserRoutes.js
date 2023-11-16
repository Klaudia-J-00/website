import express from "express";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import generateToken from "../Utils/GenerateToken.js";
import User from "../Models/UserModel.js";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const userRoute = express.Router();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

//Login
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Niepoprawny e-mail lub hasło");
    }
  })
);

//Register
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, surname, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Użytkownik już istnieje");
    }
    const user = await User.create({
      name,
      surname,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(400);
      throw new Error("Niepoprawne dane użytkownika");
    }
  })
);

//Profile
userRoute.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("Użytkownik nie znaleziony");
    }
  })
);

//update profile
userRoute.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.surname = req.body.surname || user.surname;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
        createdAt: updatedUser.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("Użytkownik nie znaleziony");
    }
  })
);

userRoute.post(
  "/loginWithGoogle",
  asyncHandler(async (req, res) => {
    const { id_token } = req.body;

    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: GOOGLE_CLIENT_ID,  
      });
      const payload = ticket.getPayload();
      const googleId = payload['sub'];
      const email = payload['email'];
      const name = payload['name'];

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          googleId,
          email,
          name,
        });
      }

      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
          createdAt: user.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("Niepoprawne dane użytkownika");
      }
    }
    verify().catch(console.error);
  })
);


export default userRoute;
