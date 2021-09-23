const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidat');

router.post('/register', candidatController.register);
router.get('/', candidatController.getCandidat);


module.exports = router;