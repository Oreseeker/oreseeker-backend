const express = require('express');
const path = require('path');

const router = express.Router();
router.get('*', (req, res, next) => {
  if (req.originalUrl.includes('.') || req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(APP_ROOT_PATH, 'public', 'index.html'));
});

router.use('/', express.static(path.join(APP_ROOT_PATH, 'public')))

module.exports = router;
