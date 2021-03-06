import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const { _id, name, email, isAdmin } = user;
        res.send({
          _id,
          name,
          email,
          isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    const { _id, name, email, isAdmin } = createdUser;
    res.send({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get('/:id', expressAsyncHandler(async(req, res) => {

  const user = await User.findById(req.params.id)
  if(user){
    res.send(user)
  }else{
    res.status(404).send({message: 'User Not Found'})
  }
}))

export default userRouter;
