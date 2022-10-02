const { validationResult } = require("express-validator");
const User = require("../../models/User");

exports.fetchNearbyUsers = async (req, res) => { 
    validationResult(req).throw();

    const { distance } = req.params;

    const users = await User.find({
        _id: { $ne: req.user._id },
        location: {
            $near: {
                $geometry: {
                    type: req.user.location.type ,
                    coordinates: req.user.location.coordinates
                },
                $maxDistance: (distance || 5) * 1000
            }
        }
    });

    return res.status(200).json({ users })
};