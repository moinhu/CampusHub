const express = require('express');
const router = express.Router();
const controller = require('../controllers/registration.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/', authenticateJWT, controller.register);
router.post('/:eventId/cancel', authenticateJWT, controller.cancel);
router.get('/my', authenticateJWT, controller.myRegistrations);

module.exports = router;
