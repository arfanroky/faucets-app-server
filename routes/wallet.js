const router = require('express').Router();
const mongoose = require('mongoose');
const walletSchema = require('../models/walletSchema.js');
const Wallet = new mongoose.model('wallet', walletSchema);
const { check, validationResult } = require('express-validator');
const {
  walletValidator,
  walletValidationHandler,
} = require('../validate/walletFieldValidator.js');

router.post('/',[
    check('wallet')
    .isLength({min: 6})
    .withMessage('Wallet must contain 6 or long 10 characters!')
    .trim(),
],
walletValidationHandler,
 async (req, res, next) => {

  const walletInfo = {
    wallet: req.body.wallet,
    link: req.body.link,
    eth: req.body.eth,
    email: req.body.email,
  };

  try {
    const result = await new Wallet(walletInfo).save();
    res.status(200).send({
        message: 'Your request Success',
        result: result
    })
} catch (error) {
    res.status(500).send({
        errors:{
            common: {msg: 'Unknown error accrued!'} 
        }
    })
}

});


router.get('/', async (req, res) => {
  const query = {};
  const getWallet = await Wallet.find(query);
  res.send(getWallet);
});

module.exports = router;
