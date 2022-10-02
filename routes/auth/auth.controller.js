const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const {generateJwtToken } = require('../../utils/token');
const { tokenLife } = require('../../constants');


exports.getLogin = (req, res) => { 
    return res.render('login');
}

exports.signup = async (req, res) => { 
    validationResult(req).throw();

    const { username, password, coordinates } = req.body

    const existingUser = await User.findOne({ username });
    if (existingUser)
        return res.status(409).json({ errorMsg: `User already exists. Login Instead.` });
  
    const newUser = new User({username, password: await bcrypt.hash(password, 12), location: { 
        type: "Point",
        coordinates
    } });

    await newUser.save();

    return res.status(201).json({ jwt: generateJwtToken({ _id: newUser._id }, tokenLife)  });
}


exports.login = async (req, res) => { 
    validationResult(req).throw();

    const { username, password } = req.body
    
    const user = await User.findOne({ username });
    if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch)
            return res.status(200).json({ jwt: generateJwtToken({ _id: user._id }, tokenLife) })
    }

    return res.status(401).json({ errorMsg: 'Invalid Credentials.'})
}