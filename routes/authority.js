const mongoose = require('mongoose');
const router = require('express').Router();
const nameSchema = mongoose.Schema({
    name: String
})
const Name = new mongoose.model('name', nameSchema);

router.post('/', async (req, res) => {
console.log(req.body);
    const newname = new Name({name: req.body.name});
    await newname.save((err, result) => {
        console.log(err);
        if(err){
            res.status(500).json({
                error: 'There was a sever side error'
            })
        }
        else{
            console.log('result',result);
            res.status(200).json({
                message: 'User was inserted successfully'
            })
        }
    })

})

router.get('/', async(req, res) => {
    const query = {};
    const result = await Name.find(query);
    res.send(result)
})


module.exports = router;


