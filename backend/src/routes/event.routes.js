const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth.middleware');

// Public listing
router.get('/', eventController.listEvents);
router.get('/:id', eventController.getEvent);

// Club creates event (protected)
router.post('/', authenticateJWT, authorizeRoles('club'), eventController.createEvent);

// Faculty/Admin approves events
router.post('/:id/approve', authenticateJWT, authorizeRoles('faculty','admin'), eventController.approveEvent);

module.exports = router;
