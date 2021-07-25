const express = require('express');
const router = express.Router();

const PersonnelController = require('../controllers/personnel');

//register
router.post('/register', PersonnelController.register);

// get personnel
router.get('/', PersonnelController.getPersonnels);


module.exports = router;