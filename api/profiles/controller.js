const ProfileModel = require('./model');

// CREATE
exports.createProfile = async (req, res) => {
    const createProfile = {
        name: req.body.name,
        email: req.body.email,
    };
    const ProfileToSave = new ProfileModel(createProfile);
    const createdProfile = await ProfileToSave.save();
    res.status(201).json(createdProfile);
};

/*
//READ
exports.getProfiles = async (req, res) => {
    const profiles = await ProfileModel.find({isDeleted: {$ne: true}});
    res.json(profiles);
};
*/

// READ (FILTERS)
exports.getProfiles = async (req, res) => {
    const { name, email, experience, skill, isDeleted, friends } = req.query;

    let filter = {};

    if (name) {
        filter.name = { $regex: name, $options: 'i' };
    }

    if (email) {
        filter.email = { $regex: email, $options: 'i' };
    }

    if (experience) {
        filter.experience = { $gte: Number(experience) };
    }

    if (skill) {
        filter.skill = { $regex: skill, $options: 'i' };
    }

    if (isDeleted !== undefined) {
        filter.isDeleted = isDeleted === 'true';
    }

    if (friends) {
        filter.friends = { $in: friends.split(',').map(id => id.trim()) };
    }

    try {
        const profiles = await ProfileModel.find(filter);
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getProfileById = async (req, res) => {
    const { id } = req.params;
    const profile = await ProfileModel.findOne({ _id: id, isDeleted: { $ne: true } });
    res.json(profile);
};

// UPDATE
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updatedProfile = await ProfileModel.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedProfile);
};

// DELETE
exports.deleteProfile = async (req, res) => {
    const { id } = req.params;
    const updates = {
        isDeleted: true
    };
    const deletedProfile = await ProfileModel.findByIdAndUpdate(id, updates, { new: true });
    res.json(deletedProfile);
};

// CREATE EXPERIENCE
exports.addExperience = async (req, res) => {
    const { id } = req.params;
    const experience = req.body;

    const updatedProfile = await ProfileModel.findByIdAndUpdate(
        id,
        { $push: { experience: experience } },
        { new: true }
    );

    if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
    }

    res.status(201).json(updatedProfile);
};

// DELETE EXPERIENCE
exports.deleteExperience = async (req, res) => {
    const { id, expId } = req.params;

    const updatedProfile = await ProfileModel.findByIdAndUpdate(
        id,
        { $pull: { experience: { _id: expId } } },
        { new: true }
    );

    if (!updatedProfile) {
        return res.status(404).json({ message: "Profile or experience not found" });
    }

    res.json(updatedProfile);
};

// CREATE SKILL
exports.addSkill = async (req, res) => {
    const { id } = req.params;
    const { skill } = req.body;

    const updatedProfile = await ProfileModel.findByIdAndUpdate(
        id,
        { $push: { skill: skill } },
        { new: true }
    );

    if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
    }

    res.status(201).json(updatedProfile);
};

// DELETE SKILL
exports.deleteSkill = async (req, res) => {
    const { id, skill } = req.params;

    const updatedProfile = await ProfileModel.findByIdAndUpdate(
        id,
        { $pull: { skill: skill } },
        { new: true }
    );

    if (!updatedProfile) {
        return res.status(404).json({ message: "Profile or skill not found" });
    }

    res.json(updatedProfile);
};