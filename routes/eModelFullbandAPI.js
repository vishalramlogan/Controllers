const express = require('express');
//const EModelFullband = require('../models/eModelFullband');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const eModelFullband = require('../controllers/eModelFullband');

//add a eModelFullband collection to database
router.post('/users/:username/eModelFullband',authUser,eModelFullband.EModelFullband_post);

router.get('/users/:username/eModelFullband',authUser,function(req,res){
    EModelFullband.find({username: req.params.username}).then(function(eModelFullband){
        res.send(eModelFullband);
    }).catch(error => {console.log(error)});
});

module.exports = router;