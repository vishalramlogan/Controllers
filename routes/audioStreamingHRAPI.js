const express = require('express');
const AudioStreamingHR = require('../models/audioStreamingHR');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const audioStreamingHR = require('../controllers/audioStreamingHR');

//add a audio streaming higher resolution collection database
router.post('/users/:username/audioStreamingHR',authUser,audioStreamingHR.AudioStreamingHR_post);
router.post('/users/:username/audioStreamingHR/AudioBitrateSA',authUser,audioStreamingHR.AudioStreamingHRAudioBitrateSA_post);
router.post('/users/:username/audioStreamingHR/VideoBitrateSA',authUser,audioStreamingHR.AudioStreamingHRVideoBitrateSA_post);
router.post('/users/:username/audioStreamingHR/PacketLossSA',authUser,audioStreamingHR.AudioStreamingHRPacketLossSA_post);
router.post('/users/:username/audioStreamingHR/PacketLossBurstinessSA',authUser,audioStreamingHR.AudioStreamingHRPacketLossBurstinessSA_post);
router.post('/users/:username/audioStreamingHR/NumTSPacketsSA',authUser,audioStreamingHR.AudioStreamingHRNumTSPacketsSA_post);
router.post('/users/:username/audioStreamingHR/AudioCodecSA',authUser,audioStreamingHR.AudioStreamingHRAudioCodecSA_post);
router.post('/users/:username/audioStreamingHR/BurstLengthSA',authUser,audioStreamingHR.AudioStreamingHRBurstLengthSA_post);

router.get('/users/:username/audioStreamingHR',authUser,function(req,res){
    AudioStreamingHR.find({username: req.params.username})
    .then(function(audioStreamingHR){
        res.send(audioStreamingHR);
    }).catch(error => {console.log(error)});
});

module.exports = router;
