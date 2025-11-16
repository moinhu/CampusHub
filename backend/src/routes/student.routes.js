const express = require('express');
const router = express.Router();

const controller = require('../controllers/student.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

// Student Dashboard Endpoints
router.get('/today', authenticateJWT, controller.todaysEvents);
router.get('/my-registrations', authenticateJWT, controller.myRegistrations);
router.get('/upcoming', authenticateJWT, controller.upcomingEvents);
router.get('/past', authenticateJWT, controller.pastEvents);

module.exports = router;
