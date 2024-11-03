const validateSchema = require('../middlewares/validateSchema');

module.exports = validateSchema({
  userId: {
    isNumeric: true,
    in: 'cookies',
  },
})
