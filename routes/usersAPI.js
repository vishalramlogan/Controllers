const express = require('express');
const router = express.Router();
const AudioStreamingHR = require('../models/audioStreamingHR');
const AudioStreamingLR = require('../models/audioStreamingLR');
const EModelFullband = require('../models/eModelFullband');
const EModelWideband = require('../models/eModelWideband');
const EModelNarrowband = require('../models/eModelNarrowband');
const Gaming = require('../models/gaming');
const VideoStreamingHR = require('../models/videoStreamingHR');
const VideoStreamingLR = require('../models/videoStreamingLR');
const VoiceTelephonyNarrowband = require('../models/voiceTelephonyNB');
const VoiceTelephonyWideband = require('../models/voiceTelephonyWB');
const Web1PageSession = require('../models/web1PageSession');
const Web2PageSession = require('../models/web2PageSession');
const WebSingleTimingEvent = require('../models/webSingleTimingEvent');
const Users = require('../models/users');
const authUser = require('../middleware/userAuth');
const users = require('../controllers/users');

// Display list of users from database
router.get('/users/:username',authUser,users.allUsers );

// Display a user from database
router.get('/user/:username',authUser,function(req,res){
    Users.find({username: req.params.username}).then(function(user){
        res.send(user);
    }).catch((error) => console.log(error));
});

//Add a user to the database
router.post('/signup',users.signUp);

// Update a password for a user
router.put('/users/:username',users.updatePassword);

// Login 
router.post('/login',users.login);

//Delete a user and all info from database by username
router.delete('/users/:admin',authUser,users.deleteUser);

//Get all of a users's info from all mappings
router.get('/usersinfo/:admin',function(req,res,next){
    if (req.params.admin === 'Administrator'){
        res.status(200);
        Gaming.find({username: req.body.username}).then(function(user){
            res.send(user);
        }).catch((error) => console.log(error));
    }else {
        res.status(401).json({
            message: 'Administrator ONLY!'
        }); 
    }
});

module.exports = router;