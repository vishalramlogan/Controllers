const express = require('express');
const EModelNarrowband = require('../models/eModelNarrowband');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const eModelNarrowband = require('../controllers/eModelNarrowband');

//add a EModelNarrowband collection to database
router.post('/users/:username/eModelNarrowband',authUser,eModelNarrowband.EModelNarrowband_post);

router.get('/users/:username/eModelNarrowband',authUser,function(req,res){
    EModelNarrowband.find({username: req.params.username}).then(function(eModelNarrowband){
        res.send(eModelNarrowband);
    }).catch(error => {console.log(error)});
});

module.exports = router;