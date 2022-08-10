const router = require('express').Router();
const mongoose = require('mongoose');
const { userValidationHandler } = require('../validate/userValidator');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const peopleSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const People = new mongoose.model('people', peopleSchema);

router.post(
  '/',
  [
    check('firstName')
      .isLength({ min: 1 })
      .withMessage('First Name is required!')
      .isAlpha('en-US', { ignore: ' -' })
      .withMessage('First Name must not contain anything other than alphabet!')
      .trim(),

    check('lastName')
      .isLength({ min: 1 })
      .withMessage('Last Name is required!')
      .isAlpha('en-US', { ignore: ' -' })
      .withMessage('Last Name must not contain anything other than alphabet!')
      .trim(),

    check('email').isEmail().withMessage('Invalid email address!').trim(),

    check('phone')
      .isMobilePhone('bn-BD', {
        strictMode: true,
      })
      .withMessage('Mobile number must be a valid Bangladeshi mobile number!'),

    check('password')
      .isStrongPassword()
      .withMessage(
        'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol!'
      ),

    check('confirmPassword').custom(async (confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error('Password must be same!');
      }
    }),
  ],
  userValidationHandler,
  async (req, res) => {
   
    try {
      const user = await People.findOne({email: req?.body?.email});
      if(user){
        return res.status(409).send({
          error: 'Email is already exists'
        })
      }
      else{
        console.log('sdf');
        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new People({...req.body, password: hashPassword}).save(
          (err, result) => {
            if (err) {
              res.status(500).send({ error: 'error' });
            }
            if (result) {
              res.status(200).send({ message: true});
            }
          }
        );
      }

    } catch (error) {
      res.status(500).send({
        error: 'internal server error!',
      });
    }
  }
);

router.get('/:email/:password',
async (req, res) => {
  console.log(req.params);
 try {
  const result = await People.findOne({email: req?.params?.email});

  const validPassword = await bcrypt.compare(req?.params?.password, result.password)
  
  if(!result || !validPassword){
    return res.status(401).send({error: 'Incorrect Email or Password!'})
  }

  if(result){
    res.status(200).send({message:true, result});
  }

 } catch (error) {
  res.status(500).send({
    error: 'Internal server error'
  })
 }
});

module.exports = router;
