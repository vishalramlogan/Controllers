const express = require('express');
const VoiceTelephonyWideband = require('../models/voiceTelephonyWB');
const router = express.Router();
const authUser = require('../middleware/userAuth');
const voiceTelephonyWB = require('../controllers/voiceTelephonyWB');

//add a VoiceTelephonyWideband collection database
router.post('/users/:username/voiceTelephonyWideband',authUser,voiceTelephonyWB.VoiceTelephonyWB_post);
router.post('/users/:username/voiceTelephonyWideband/SpeechDelaySA',authUser,voiceTelephonyWB.VoiceTelephonyWBSpeechDelaySA_post);
router.post('/users/:username/voiceTelephonyWideband/PacketLossSA',authUser,voiceTelephonyWB.VoiceTelephonyWBPacketLossSA_post);
router.post('/users/:username/voiceTelephonyWideband/TalkerEchoSA',authUser,voiceTelephonyWB.VoiceTelephonyWBTalkerEchoSA_post);
router.post('/users/:username/voiceTelephonyWideband/EquipmentImpairmentSA',authUser,voiceTelephonyWB.VoiceTelephonyWBEquipmentImpairmentSA_post);
router.post('/users/:username/voiceTelephonyWideband/PacketLossRoubustnessSA',authUser,voiceTelephonyWB.VoiceTelephonyWBPacketLossRoubustnessSA_post);

router.get('/users/:username/voiceTelephonyWideband',authUser,function(req,res){
    VoiceTelephonyWideband.find({username: req.params.username}).then(function(voiceTelephonyWideband){
        res.send(voiceTelephonyWideband);
    }).catch(error => {console.log(error)});
});

module.exports = router;