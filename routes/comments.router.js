const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { Op } = require('sequelize');
const { Comments, Posts } = require('../models');




module.exports = router;