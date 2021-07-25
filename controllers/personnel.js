const Personnel = require('../models/Personnel');


exports.register = (req, res) => {
    const personnel = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        cin: req.body.cin
    }
    Personnel
    .findOne({email: personnel.email})
    .then(data => {
        if(data) {
            res.json({message: 'Cette personne existe déjà!'});
        }else {
            const personne = new Personnel(personnel);
            personne
            .save()
            .then(() => {
                res.json({message: 'Création de compte, bien effectué!'});
            }).catch((err) => res.send('error: '+err));
        }
    }).catch(error => res.send('error: '+error));
}

exports.getPersonnels = (req, res) => {

    Personnel
    .find()
    .then(personnels => {
        if(personnels){
            res.status(200).send(personnels)
        }else {
            res.json({message: 'La liste de personnel est vide!'})
        }
    }).catch(error => res.send('error: '+ error));
}