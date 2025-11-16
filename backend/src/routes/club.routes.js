const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');

const { authenticateJWT, authorizeRoles } = require('../middleware/auth.middleware');

// Admin creates new club
router.post('/', authenticateJWT, authorizeRoles('admin'), clubController.createClub);

// Admin adds a user to a club
router.post('/:clubId/members', authenticateJWT, authorizeRoles('admin'), clubController.addMember);

// A club user checks their clubs
router.get('/my', authenticateJWT, clubController.getMyClubs);

module.exports = router;
