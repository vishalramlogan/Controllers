const express = require('express');
const Web1PageSession = require('../models/web1PageSession');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const web1PagesSession = require('../controllers/web1PageSession');

//add a web1PageSession collection database
router.post('/users/:username/web1PageSession',authUser,web1PagesSession.Web1PageSession_post);
router.post('/users/:username/web1PageSession/ExpectedSA',authUser,web1PagesSession.Web1PageSessionExpectedSA_post);
router.post('/users/:username/web1PageSession/SessionSA',authUser,web1PagesSession.Web1PageSessionSessionSA_post);

router.get('/users/:username/web1PageSession',authUser,function(req,res){
    Web1PageSession.find({username: req.params.username}).then(function(web1PageSession){
        res.send(web1PageSession);
    }).catch(error => {console.log(error)});
});

module.exports = router;