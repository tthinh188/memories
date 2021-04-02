import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }); // check if found user

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); // compare brcypt password with the password stored from the db

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credential" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h"}); // create token with secret: "test"

        res.status(200).json({ result: existingUser, token }); // sending back to front end the user and token for authorization.
    } catch (error) {
        res.status(500).json({ message: "Something went wrong !" })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({ email }); // find if user existed

        if(existingUser) return res.status(400).json({ message: "User already existed" });

        if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match." }); 

        const hashedPassword = await bcrypt.hash(password, 12); // create hashed password , salt : 12

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` }); // from models.user create user.

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h"}); // create token with secret: "test"

        res.status(200).json({ result: result, token }); // sending back user to the front-end and token for authorization.
    } catch (error) {
        res.status(500).json({ message: "Something went wrong !" })
    }
}