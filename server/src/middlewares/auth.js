import jwt from "jsonwebtoken"
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET

const userAuth = async (req, res, next) => {
  try {
    let token = req.body.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      throw new Error("Token not found");
    }

    const decodedObj = jwt.verify(token, JWT_SECRET);
    const { userId } = decodedObj;

    const user = await User.findOne( {userId} );

    console.log("USER"+ user);
    
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export default userAuth
