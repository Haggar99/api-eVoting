const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    const adminData = {
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        cin: req.body.cin,
        password:''
    };
    console.log(adminData);
    Admin
    .findOne({email: req.body.email})
    .then(user => {
        if(user){
            res.json({message: 'ce compte existe déjà!'});
        }else{
            const hash = bcrypt.hashSync(req.body.password, 10);
            adminData.password = hash;
            const newAdmin = new Admin(adminData);
            newAdmin
            .save()
            .then(admin => {
                /*const token = jwt.sign(
                    {userId: admin._id, email: admin.email},
                    process.env.JWT_KEY_ADMIN,
                    {expiresIn: '24h'}
                );*/
                res.json({message: 'Création de compte administrateur bien effectué!'});
            }).catch(error => res.send('erreur: '+error));
        }
    }).catch(error => res.send('erreur: '+ error));
}

exports.login = (req, res) => {
    Admin
    .findOne({email: req.body.email})
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const token = jwt.sign(
                    {userId: user._id, email: user.email},
                    process.env.JWT_KEY_ADMIN,
                    {expiresIn: '24h'}
                );
                res.json({message: 'Vous etes bien connecté!', token, user})
            }else {
                res.json({message: 'Mot de passe incorrect'});
            }
        }else {
            res.json({message: 'Ce compte n\'existe pas!'});
        }
    }).catch(error => res.send('erreur: '+error))
}