const Votant = require('../models/votant');
const Personnel = require('../models/Personnel');
const Vote = require('../models/vote');
const Candidat = require('../models/candidat');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const data = {
        cin: req.body.cin,
        email: req.body.email,
        password: req.body.password
    };
    
    Personnel
    .findOne({cin: data.cin, email: data.email})
    .then(personnel => {
        if(personnel){
            Votant
            .findOne({cin: data.cin, email: data.email})
            .then(votant => {
                if(votant){
                    res.json({message: 'Ce compte est déjà activé, merci de se connecter'});
                }else {
                    const hash = bcrypt.hashSync(data.password, 10);
                    const newUser = {
                        firstName: personnel.firstName,
                        lastName: personnel.lastName,
                        email: personnel.email,
                        cin: personnel.cin,
                        password: hash
                    };
                    const newVotant = new Votant(newUser);
                    newVotant
                    .save()
                    .then(user => {
                        let token = jwt.sign(
                            {userId: user._id, email: user.email},
                            process.env.JWT_KEY,
                            {expiresIn: '48h'}
                        );
                        res.json({token: token});
                    }).catch(error => res.send('erreur: '+error));
                   
                }
            }).catch(error => {
                res.send('erreur: '+error);
            })
        }else {
            res.json({message: 'Information incorrect!'});
        }
    }).catch(error => res.send('erreur: '+error));
}

exports.login = (req, res) => {
    Votant
    .findOne({email: req.body.email})
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const token = jwt.sign(
                    {userId: user._id, email: user.email},
                    process.env.JWT_KEY,
                    {expiresIn: '48h'}
                );
                res.json({message: 'vous etes bien connecté!', token: token, user});
            }else {
                res.json({message: 'mot de passe incorrect!'});
            }
        }else {
            res.json({message: 'ce compte n\'exist pas!'});
        }
    }).catch(error => res.send('erreur: '+error));
}

exports.voting = async (req, res) => {
    const userData = req.UserData;
    //const userData = "";
    try {
        const votant = await Votant.findById(userData.userId);
        const candidat = await Candidat.findById(req.body.candidatId);

        if(votant.isVoted) {
            res.json({message: 'Désolé, vous avez déjà voté!'});
        }else {
            Vote.findOne({votantId: userData._id})
                .then(vote => {
                    if(vote){
                     res.json({message: 'Désolé, vous avez déjà voté!'});
                    }else{
                        try {
                            votant.isVoted = true;
                            candidat.vote.push(votant._id);
                            const newVote = new Vote({votantId: votant._id, candidatId: candidat._id});
                            votant.save().then(()=> {});
                            newVote.save().then(()=> {});
                            candidat.save().then(()=> {});
                            res.json({message: 'Vous venez de voter, merci!'});
                            
                        } catch (error) {
                            res.status(500).json({ message: 'An error occurred!', error }); 
                        }
                    }
                }).catch(error => res.send('error: '+ error));
        }
        
    } catch (error) {
    res.status(500).json({ message: 'An error occurred!', error });
    }
}