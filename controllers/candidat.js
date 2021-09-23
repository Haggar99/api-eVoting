const Candidat = require('../models/candidat');
const Personnel = require('../models/personnel');
const mongoose = require('mongoose');
const decrypt = require('../middlewares/decrypt');


exports.register = (req, res) => {
    userData = req.useData;
    Personnel
    .findById(mongoose.Types.ObjectId(req.body.personnelId))
    .then(personnel => {
          if(personnel) {
              const candidat = {
                  firstName: personnel.firstName,
                  lastName: personnel.lastName,
                  cin: personnel.cin,
                  email: personnel.email,
                  adminId: '614a58f16e29bb092c0549e0',
              }
              const newCandidat = new Candidat(candidat);
              newCandidat
              .save()
              .then(() => {
                  res.json({message: 'Le candidat a été bien prise en compte'});
              }).catch(error => res.send('erreur: '+ error));
          }else {
              res.json({message: 'Le candidat que vous avez sélectionné n\'existe pas dans la liste de personnel'});
          }
    }).catch(error => res.send('erreur: '+error));
}

exports.getCandidat = async (req, res) => {
    try {
        Candidat
        .find()
        .then(data => {
            // console.log(data)
            if (data) {
                const newData = data.map((el, index) => {
                    const newD = {
                        adminId: el.adminId,
                        cin: el.cin,
                        createdAt: el.createdAt,
                        email: el.email,
                        firstName: el.firstName,
                        vote: el.vote,
                        _id: el._id,
                        lastName: el.lastName,
                        nombreVote: decrypt(el.nombreVote)
                    }
                    return newD;
                });
                console.log(newData)
                res.status(200).json({candidats: newData});
            } else {
                res.json({message: "Il y a aucun candidat a affiché!"})
            }
        })
    } catch (error) {
        res.json({message: "Une Erreur est survenus!"});
    }
}