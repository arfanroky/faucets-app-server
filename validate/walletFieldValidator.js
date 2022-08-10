const {validationResult } = require('express-validator');

const walletValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.send({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  walletValidationHandler,
};
