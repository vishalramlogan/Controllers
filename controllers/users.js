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

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.allUsers = function(req,res){
    if (req.params.username === 'Administrator'){
        res.status(200);
        Users.find({}).then(function(user){
            res.send(user);
        }).catch((error) => {
            console.log(error);
            res.status(500);
        });
    }
    else {
        res.status(401).json({
            message: 'Administrator ONLY!'
        }); 
    }
};

exports.signUp = function(req,res){
    Users.find({username: req.body.username})
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Username Taken'
            }); //Conflict occurs
        } else{  
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    (new Users({'username': req.body.username , 'password': hash, 
                    'passwordConfirmation':req.body.passwordConfirmation, 
                    'securityQuestion': req.body.securityQuestion, 
                    'securityQuestionAnswer':req.body.securityQuestionAnswer}))
                    .save().then(function(users){
                        res.send(users);}).catch(error => {console.log(error)});
                }
            }
        )}}
)};

exports.updatePassword = function(req,res){
    Users.findOneAndUpdate({username: req.params.username},req.body).then(function(){ 
       Users.find({username: req.params.username}).then(function(user){
        res.send(user);
       }).catch((error) => console.log(error));
    });
};

exports.login = function(req,res){
    Users.find({username: req.body.username})
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message: 'Login Fail'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result) =>{
            if (err){
                return res.status(401).json({
                    message: 'Login Fail'
                });
            }
            if (result){
                const token = jwt.sign({
                    username: user[0].username
                }, 
                'my_secrete_key',
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Login Successful',
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Login Fail'
            });
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

};

exports.deleteUser = function(req,res,next){
    const deleteUserInfo = (user) => {
        Gaming.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        AudioStreamingHR.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        AudioStreamingLR.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        EModelFullband.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        EModelWideband.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        EModelNarrowband.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        VideoStreamingHR.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        VideoStreamingLR.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        VoiceTelephonyNarrowband.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        VoiceTelephonyWideband.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        Web1PageSession.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        Web2PageSession.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
        WebSingleTimingEvent.deleteMany({username: req.body.username})
        .then(() => user)
        .catch((error) => console.log(error));
    };
    if (req.params.admin === 'Administrator'){
        res.status(200);
        Users.findOneAndRemove({username: req.body.username})
        .then((user) => {res.send(deleteUserInfo(user));})
        .catch((error) => console.log(error));
    }
    else {
        res.status(401).json({
            message: 'Administrator ONLY!'
        }); 
    }
};