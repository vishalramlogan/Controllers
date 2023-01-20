const express = require('express');
const VoiceTelephonyNarrowband = require('../models/voiceTelephonyNB');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const voiceTelephonyNB = require('../controllers/voiceTelephonyNB');

//add a VoiceTelephonyNarrowband collection database
router.post('/users/:username/voiceTelephonyNarrowband',authUser,voiceTelephonyNB.VoiceTelephonyNB_post);
router.post('/users/:username/voiceTelephonyNarrowband/SpeechDelaySA',authUser,voiceTelephonyNB.VoiceTelephonyNBSpeechDelaySA_post);
router.post('/users/:username/voiceTelephonyNarrowband/PacketLossSA',authUser,voiceTelephonyNB.VoiceTelephonyNBPacketLossSA_post);
router.post('/users/:username/voiceTelephonyNarrowband/TalkerEchoSA',authUser,voiceTelephonyNB.VoiceTelephonyNBTalkerEchoSA_post);
router.post('/users/:username/voiceTelephonyNarrowband/CombinationSA',authUser,voiceTelephonyNB.VoiceTelephonyNBCombinationSA_post);

router.get('/users/:username/voiceTelephonyNarrowband',authUser,function(req,res){
    VoiceTelephonyNarrowband.find({username: req.params.username}).then(function(voiceTelephonyNarrowband){
        res.send(voiceTelephonyNarrowband);
    }).catch(error => {console.log(error)});
});

module.exports = router;