const Votant = require('../models/votant');
const Personnel = require('../models/Personnel');
const Vote = require('../models/vote');
const Candidat = require('../models/candidat');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const openpgp = require('openpgp');
const encrypt = require('../middlewares/encrypt');
const decrypt = require('../middlewares/decrypt');


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
                            {expiresIn: '200h'}
                        );
                        const userData = {
                            token,
                            user,
                            message: 'Votre compte a été bien activé',
                            expiresIn: 1728000000
                        }
                        res.json({user: userData});
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
                    {expiresIn: '200h'}
                );
                const userData = {
                    token,
                    user,
                    message: 'vous etes bien connecté!',
                    expiresIn: 1728000000
                }
                res.json({user: userData});
            }else {
                res.json({message: 'mot de passe incorrect!'});
            }
        }else {
            res.json({message: 'ce compte n\'exist pas!'});
        }
    }).catch(error => res.send('erreur: '+error));
}

exports.getVotant = async (req, res) => {
    const data = [
        {
            nom: 'Haggar',
            nbre: 'iHSJZzUCbOPJLMBenjQhGUIbOwqxXK8X0PFmrHuKeVboCS6CrZMlLkyxu9zvNNBocz+OZYFmKeTfkcC9dCQlWcrc2McArOeWklr4vPapgqgo8+LknYkyad9eYYUQJea/eNTTTj9fkhROGD6Zd2U/7WLvcYqMYRsqNlKjEAbk1og='
        },
        {
            nom: 'Senoussi',
            nbre: 'Q7fdhefe7mhuTc5IHdAnGqEiXQ5qQ7zqbgDq29ukWQEPFx+Xn5O59uM4HQlqlStFhhgcyGmYslCiLnyIjocSy0ghTnoat/akwaQwAq06mqlgnhxZkeJ/okUWAatPdVOUYjQL4se7M+WPHsxqMUy43Ynb3t4oWH65Dq0jKC4uH70='
        }
    ]
    // const msgEn = encrypt(12);
    // decrypt(msgEn);
    console.log(data);
    const newData = data.map(el => {
        const newD = {
            ...el,
            nbre: decrypt(el.nbre)
        };
        return newD;
    });
    console.log(newData);
    try {
        const votant = await Votant.findById(req.params.votantId);
        if (votant) {
            await res.status(200).json({votant});
        } else {
            res.json({message: "Aucun utilisateur a ce nom"});
        }
    } catch (error) {
        res.json({message:'Une erreur est survenus!'});
    }
}

exports.voting = async (req, res) => {
    const userData = req.UserData;
    //const userData = "";
    try {
        const votant = await Votant.findById(req.body.userId);
        const candidat = await Candidat.findById(req.body.candidatId);

        if(votant.isVoted) {
          await res.json({message: 'Désolé, vous avez déjà voté!'});
        }else {
            Vote.findOne({votantId: req.body.userId})
                .then(vote => {
                    if(vote){
                     res.json({message: 'Désolé, vous avez déjà voté!'});
                    }else{
                        try {
                            let nobreVoteDecrypted;
                            const nombreVote = candidat.nombreVote;
                            if(nombreVote) {
                                
                            nobreVoteDecrypted = parseInt(decrypt(nombreVote));
                            nobreVoteDecrypted = nobreVoteDecrypted + 1;

                            }else {
                            nobreVoteDecrypted = 1;
                            }
                            const nbreVoteEncrypt = encrypt(nobreVoteDecrypted);
                            candidat.nombreVote = nbreVoteEncrypt;
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

