const Candidat = require('../models/candidat');
const Personnel = require('../models/personnel');
const mongoose = require('mongoose');


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
                  adminId: userData.userId
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