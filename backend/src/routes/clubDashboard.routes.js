const express = require('express');
const router = express.Router();

const controller = require('../controllers/clubDashboard.controller');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth.middleware');

// Club dashboard routes (club-only)
router.get('/events', authenticateJWT, authorizeRoles('club'), controller.myEvents);
router.get('/events/:eventId/registrations', authenticateJWT, authorizeRoles('club'), controller.registrations);
router.get('/events/:eventId/attendance', authenticateJWT, authorizeRoles('club'), controller.attendance);
router.get('/events/:eventId/analytics', authenticateJWT, authorizeRoles('club'), controller.analytics);

module.exports = router;
