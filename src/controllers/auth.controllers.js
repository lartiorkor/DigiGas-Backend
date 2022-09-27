const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const body = req.body;

    const {email, password} = body;

    // make sure user exists
    const search_user = await User.findOne({email});
    if (!search_user) {
        res.status(404).send({
            message: "User with given email does not exist"
        })
        return;
    }

    // check if passwords match if user is found
    const password_match = bcrypt.compare(password, search_user.password);
    if (!password_match) {
        res.status(403).send({
            message: "Incorrect password"
        });
        return;
    }
    
    const token = jwt.sign({id: search_user._id, email: search_user.email}, "jwt_secret");

    res.status(200).send({
        message: "Login successful",
        data: {
            id: search_user._id,
            ...search_user._doc,
            token
        }
    });
}

const register = async (req, res) => {
    const {username, email, password} = req.body;

    // check if accout with same email already exist
    const search_user = await User.findOne({email});
    if (search_user) {
        res.status(402).send({
            message: "Email address already exists"
        });
        return;
    }

    // hash password if email address is unique
    const new_password = await bcrypt.hash(password, 12);

    //create new user
    const new_user = new User({username, email, password: new_password});

    const user = await new_user.save();
    const token = jwt.sign({id: user._id, email: user.email}, "jwt_secret");

    res.status(200).send({
        message: "New user created",
        data: {
            id: user._id,
            ...user._doc,
            token
        }
    });
}

exports.register = register;
exports.login = login;
