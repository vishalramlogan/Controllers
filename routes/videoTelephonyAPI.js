const express = require('express');
const VideoTelephony = require('../models/videoTelephony');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const videoTelephony = require('../controllers/videoTelephony');

//add a videoTelephony variables database
router.post('/users/:username/videoTelephony',authUser,videoTelephony.VideoTelephony_post);
router.post('/users/:username/videoTelephony/PacketLossSA',authUser,videoTelephony.VideoTelephonyPacketLossSA_post);
router.post('/users/:username/videoTelephony/FrameRateSA',authUser,videoTelephony.VideoTelephonyFrameRateSA_post);
router.post('/users/:username/videoTelephony/BitRateSA',authUser,videoTelephony.VideoTelephonyBitRateSA_post);
router.post('/users/:username/videoTelephony/CombinationSA',authUser,videoTelephony.VideoTelephonyCombinationSA_post);

router.get('/users/:username/videoTelephony',authUser,function(req,res){
    VideoTelephony.find({username: req.params.username}).then(function(videoTelephony){
        res.send(videoTelephony);
    }).catch(error => {console.log(error)});
});

module.exports = router;