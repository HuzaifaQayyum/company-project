const { Schema, model } = require('mongoose');


const pointSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
        type: pointSchema,
        index: '2dsphere'
    }
});


module.exports = model('users', userSchema)