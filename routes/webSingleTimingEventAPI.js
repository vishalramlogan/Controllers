const express = require('express');
const WebSingleTimingEvent = require('../models/webSingleTimingEvent');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const webSingleTimingEvent = require('../controllers/webSingleTimingEvent');

//add a WebSingleTimingEvent collection database
router.post('/users/:username/webSingleTimingEvent',authUser,webSingleTimingEvent.WebSingleTimingEvent_post);
router.post('/users/:username/webSingleTimingEvent/ExpectedSessionSA',authUser,webSingleTimingEvent.WebSingleTimingEventExpectedSA_post);
router.post('/users/:username/webSingleTimingEvent/SessionSA',authUser,webSingleTimingEvent.WebSingleTimingEventSessionSA_post);

router.get('/users/:username/webSingleTimingEvent',authUser,function(req,res){
    WebSingleTimingEvent.find({username: req.params.username}).then(function(webSingleTimingEvent){
        res.send(webSingleTimingEvent);
    }).catch(error => {console.log(error)});
});

module.exports = router;