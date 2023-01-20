const express = require('express');
const Web2PageSession = require('../models/web2PageSession');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const web2PagesSession = require('../controllers/web2PageSession');

//add a web2PageSession collection database
router.post('/users/:username/web2PageSession',authUser, web2PagesSession.Web2PageSession_post);
router.post('/users/:username/web2PageSession/ExpectedSessionSA',authUser, web2PagesSession.Web2PageSessionExpectedSA_post);
router.post('/users/:username/web2PageSession/SessionSA',authUser, web2PagesSession.Web2PageSessionSessionSA_post);

router.get('/users/:username/web2PageSession',authUser,function(req,res){
    Web2PageSession.find({username: req.params.username}).then(function(web2PageSession){
        res.send(web2PageSession);
    }).catch(error => {console.log(error)});
});

module.exports = router;