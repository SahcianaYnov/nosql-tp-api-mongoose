const { Router } = require('express');
const router = Router();
const ProfileController = require('./controller');

router.post('/profiles', ProfileController.createProfile); // CREATE
router.get('/profiles', ProfileController.getProfiles); // READ (list)
router.get('/profiles/:id', ProfileController.getProfileById); // READ (one)
router.put('/profiles/:id', ProfileController.updateProfile); // UPDATE
router.delete('/profiles/:id', ProfileController.deleteProfile); // DELETE

router.post('/profiles/:id/experience', ProfileController.addExperience); // CREATE EXPERIENCE
router.delete('/profiles/:id/experience/:expId', ProfileController.deleteExperience); // DELETE EXPERIENCE
router.post('/profiles/:id/skills', ProfileController.addSkill); // CREATE SKILL
router.delete('/profiles/:id/skills/:skill', ProfileController.deleteSkill); // DELETE SKILL


module.exports = router;
