const {check, validationResult} = require('express-validator');

const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length === 0){
        next()
    }
    else{
        res.status(500).send({
            errors: mappedErrors
        })
    }
}

module.exports = {
    userValidationHandler
};