const { User } = require("../models/user.js");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const {SECRET_KEY} = process.env
const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
//   console.log(user)
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
//   console.log(hashPassword)
  const newUser = await User.create({ ...req.body, password: hashPassword });
//  console.log(newUser);
  res.status(201).json({
    email: newUser.email,
  password:password,
    // name: newUser.name,
  });
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user)
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id:user.id
 }
 console.log(payload)
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"})
await User.findByIdAndUpdate(user._id, {token});
  const passwordCompare = await bcrypt.compare(password, user.password);
 if(!passwordCompare) {
  throw HttpError(401, "Email or password is wrong");
 }
  res.json({
    user:{
        email: user.email,
        subscription: user.subscription,
    },
    // password:password,
    token, 
  })
};
const getCurrent =async (req, res) =>{
const {email, name}= req.user
res.json({email, name,})
}

const logout= async (req, res) =>{ 
  const {_id}= req.user
  await User.findByIdAndUpdate(_id, {token:""})
  res.json({
    message: "Logout success"
  })
}
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent:ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout)
};
