const express = require('express');

const router = express.Router();

const votantController = require('../controllers/votant');


router.post('/register', votantController.register);
router.post('/login', votantController.login);
router.post('/voter', votantController.voting);
router.get('/:votantId', votantController.getVotant);


module.exports = router;