const express = require('express');
const EModelWideband = require('../models/eModelWideband');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const eModelWideband = require('../controllers/eModelWideband');

//add a gaming collection to database
router.post('/users/:username/eModelWideband',authUser,eModelWideband.EmodeleWideband_post);

router.get('/users/:username/eModelWideband',authUser,function(req,res){
    EModelWideband.find({username: req.params.username}).then(function(eModelWideband){
        res.send(eModelWideband);
    }).catch(error => {console.log(error)});
});

module.exports = router;