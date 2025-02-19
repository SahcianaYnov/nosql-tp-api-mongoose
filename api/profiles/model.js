const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    experience: [{ type: Schema.Types.Mixed }],
    skill: { type: [String] },
    isDeleted: { type: Boolean, default: false },
    friends: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
});

module.exports = model('Profile', ProfileSchema);
