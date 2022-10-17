require('dotenv').config();
const User = require('../models/user.model');
const Prontuario = require('../models/prontuarios.model');
const ObjectID = require('mongodb').ObjectID;

const sgMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = { 
    userGetPacient: async (req, res) => {
        try {
            const usersPacient = await User.find({ userPermission: {$eq: 'paciente'} }).populate('prontuarios');          
            
            res.status(200).json({
                message: 'Consulting users pacient with successfully!',
                user: usersPacient
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
    },
    userGet: async (req, res) => {  
        try {
            const users = await User.find().populate(['prontuarios']);
            const pacient = await User.find({ userPermission: {$eq: 'paciente'} }).count();
            const administrator = await User.find({ userPermission: {$eq: 'administrador'} }).count();
            const physiotherapist = await User.find({ userPermission: {$eq: 'fisioterapeuta'} }).count();
              
            res.status(200).json({
                message: 'Consulting users with successfully!',
                user: users,
                pacient: pacient,
                administrator: administrator,
                physiotherapist: physiotherapist
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }          
    },
    userGetId: async (req, res, next) => {
        // try {
        //     const paciente = await Paciente.findById(req.params.id)
        //     res.json(paciente)
        //     if (paciente == null) {
        //         return res.status(404).json({ message: 'Paciente not found!' })
        //     }
        // } catch (error) {
        //     res.status(500).json({ message: error.message })
        // }  
        // next()    
    },
    userPost: async (req, res, next) => {   
        try {            
            const userScheduling = await User.create(req.body);
            const dados = {
                name: req.body.userName,
                email: req.body.userEmail,
                cpf: req.body.userCpf,
            }
            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/add-user.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);
            const messageBody = (template({
                name: `${ dados.name }`,   
                email: `${ dados.email }`, 
                cpf: `${ dados.cpf }`,            
            }))

            const msg = {
                to: [
                  '' + `${req.body.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Life Calendar - Novo usuário',
                html: messageBody 
              };
              
              sgMail
                .send(msg)
                .then(() => {
                  console.log('Email successfully sent');
                }, error => {
                  console.error(error);  
                  if (error.response) {
                    console.error(error.response.body);
                  }
                });  

            return res.send({ userScheduling });               
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }       
    },
    userUpdateId: async (req, res, next) => {  
        const user = ({
            _id: req.body.id,
            userName: req.body.userName,
            userLastName: req.body.userLastName,
            userBirth: req.body.userBirth,
            userPhone: req.body.userPhone,
            userEmail: req.body.userEmail,
            userCpf: req.body.userCpf,
            userAddress: req.body.userAddress,
            userNumber: req.body.userNumber,
            userComplement: req.body.userComplement,
            userCity: req.body.userCity,
            userState: req.body.userState,
            userPermission: req.body.userPermission
        }); 

        try {            
            await User.updateOne({ _id: req.params.id }, user)
            .then(updateUser => {
                res.status(200).json({ 
                    message: 'Update user with successfully!',
                    userId: updateUser._id 
                })
            }); 

            const dados = {
                name: req.body.userName
            }

            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/updated-user.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);

            const messageBody = (template({
                name: `${ dados.name }`        
            }))

            const msg = {
                to: [
                  '' + `${req.body.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Life Calendar - Atualização dos dados',
                html: messageBody 
              };
            
              sgMail
                .send(msg)
                .then(() => {
                  console.log('Email successfully sent');
                }, error => {
                  console.error(error);  
                  if (error.response) {
                    console.error(error.response.body);
                  }
                });  

        } catch (error) {
            res.status(400).json({ message: error.message });
        }  
        next();
    },
    chartUpdateId: async (req, res, next) => {              
        try {            
            const user = await User.findById({ _id: req.params.id});
            const userPacientChat = new Prontuario({
                treatment: req.body.treatment,
                user: user._id
            });

            await userPacientChat.save()
            .then(createdChart => {
                res.status(201).json({
                    message: 'Add chart with successfully!',
                    userId: createdChart._id
                })
            });           
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    },
    userDeleteId: async (req, res, next) => {
        try {
            const user = await User.deleteOne({ _id: req.params.id });
            if (user !== null) {
                return res.status(200).json({ message: 'User was deleted' });
            } else {
                return res.status(404).json({ message: 'User ID does not exist to be deleted' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
        next();
    }
}