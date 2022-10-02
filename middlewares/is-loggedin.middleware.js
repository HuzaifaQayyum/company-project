const User = require("../models/User");

module.exports = async (req, res, next) => {
    const user = await User.findOne({ _id: req.auth._id });
    if (!user) return res.status(401).end();

    req.user = user;
    return next();
}