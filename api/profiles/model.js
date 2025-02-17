const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true},
    experience: {type: Schema.Types.Mixed, require: true},
    skill: {type: String, require: true},
    isDeleted: {type: Boolean, require: false},
    friends: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
})

module.exports = model('Profile', ProfileSchema);