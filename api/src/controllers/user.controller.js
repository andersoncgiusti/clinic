require('dotenv').config();
const User = require('../models/user.model');
const Prontuario = require('../models/prontuarios.model');
const Cash = require('../models/cash.model');
const Agendamento = require('../models/agendamento.model');
const ObjectID = require('mongodb').ObjectID;
const sgMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const crypto = require('crypto');
 
generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = { 
    // useGetCpf: async (req, res) => {
    //     const { userCpf } = req.body;

    //     try {
    //         const usersPacient = await User.find({ userCpf: {$eq: `${userCpf}`} });          
    //         res.status(200).json({
    //             message: 'Consulting users for CPF with successfully!',
    //             user: usersPacient
    //         });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },
    userGetPacient: async (req, res) => {
        try {
            const usersPacient = await User.find({ userPermission: {$eq: 'paciente'} }).populate('prontuarios');          
            
            res.status(200).json({
                message: 'Consulting all users with successfully!',
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
        try {
            const usersPacient = await User.findById(req.params.id);   
            res.status(200).json({
                message: 'Consulting users for ID with successfully!',
                user: usersPacient
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
    },
    userPost: async (req, res) => {   
        const { userEmail } = req.body;

        try {            
            if (await User.findOne({ userEmail } )) {
                return res.status(400).send({ message: "User alredy exists!" });
            }

            const userScheduling = await User.create(req.body);

            // bcrypt.hash(req.body.password, 10).then(hash => {
            //     const userScheduling = new User({
            //         userName            : req.body.userName,
            //         userLastName        : req.body.userLastName,
            //         userBirth           : req.body.userBirth,
            //         userPhone           : req.body.userPhone,
            //         userEmail           : req.body.userEmail,
            //         userCpf             : req.body.userCpf,
            //         userAddress         : req.body.userAddress,
            //         userNumber          : req.body.userNumber,
            //         userComplement      : req.body.userComplement,
            //         userCity            : req.body.userCity,
            //         userState           : req.body.userState,
            //         userPermission      : req.body.userPermission,
            //         password            : hash,
            //         // passwordResetToken  : req.body.passwordResetToken,
            //         // passwordResetExpires: req.body.passwordResetExpires
            //     })
            //     userScheduling
            //       .save()
            //       .then(result => {
            //         res.status(201).json({
            //             message: "User created!",
            //             result: result
            //         })
            //     })
            // })

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
                subject: 'Novo usuário - Life Calendar',
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
        const hash = await bcrypt.hash(req.body.password, 10);
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
            userPermission: req.body.userPermission,
            userPermission      : req.body.userPermission,  
            password            : hash
            // passwordResetToken  : req.body.passwordResetToken,
            // passwordResetExpires: req.body.passwordResetExpires
        }); 

        // user.password = undefined;

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
                subject: 'Atualização dos dados - Life Calendar',
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
            // const user = await User.findById({ _id: req.params.id });

            // const userBody = req.params.id;
            // console.log(userBody);
            
            // { userPermission: {$eq: 'paciente'} }
            // const userProntuario = await Prontuario.findById({ user: { $eq: `${userBody}` }});
            // const userCash = await Cash.findById({ user: { $eq: `${userBody}` }});
            // const userAgendamento = await Agendamento.findById({ user: { $eq: `${userBody}` }});
            // console.log('user', user);
            // console.log('userProntuario', userProntuario);
            // console.log('userCash', userCash);
            // console.log('userAgendamento', userAgendamento);

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
    },
    userPassword: async (req, res, next) => {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = ({
            _id: req.body._id,
            password: hash
        }); 

        try {            
            const userId = await User.findById(req.body._id);

            await User.findByIdAndUpdate(req.body._id, user)
            .then(updateUser => {

                res.status(200).json({ 
                    message: 'Password add user with successfully!',
                    userId: updateUser._id 
                })
            }); 

            const dados = {
                name: userId.userName
            }
            
            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/add-pass.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);

            const messageBody = (template({
                name: `${ dados.name }`        
            }))

            const msg = {
                to: [
                  '' + `${userId.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Senha cadastrada - Life Calendar',
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
    userPasswordId: async (req, res, next) => {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = ({
            _id: req.body._id,
            password: hash
        }); 

        try {            
            const userId = await User.findById(req.body._id);

            await User.findByIdAndUpdate(req.body._id, user)
            .then(updateUser => {
                res.status(200).json({ 
                    message: 'Password updated user with successfully!',
                    userId: updateUser._id 
                })
            }); 

            const dados = {
                name: userId.userName
            }
            
            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/updated-pass.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);

            const messageBody = (template({
                name: `${ dados.name }`        
            }))

            const msg = {
                to: [
                  '' + `${userId.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Senha atualizada - Life Calendar',
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
    authenticate: async (req, res) => {
    //     let fetchedUser        
    //     User.findOne({ userEmail: req.body.userEmail })
    //     .then(async user => {
    //     if (!user) {
    //       return res.status(401).json({
    //         message: "Auth failed"
    //       });
    //     } 
    //     fetchedUser = user
    //     console.log(await bcrypt.hash(req.body.password, 10), user.password);
    //     return bcrypt.compare(req.body.password, user.password)
    //   })
    //   .then(result => {
    //     if (!result) {
    //       return res.status(401).json({ message: "Auth failed" })
    //     }
    //     const token = jwt.sign(
    //       { userEmail: fetchedUser.userEmail, userId: fetchedUser.id }, process.env.SECRET_STRING,
    //       { expiresIn: "1h" }
    //     )
    //     console.log(token);
    //     res.status(200).json({ token: token, expiresIn: 3600, userId: fetchedUser.id })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     return res.status(401).json({ message: "Invalid authentication credentials!" })
    //   })

        const { userEmail, password } = req.body;

        const user = await User.findOne({ userEmail }).select('+password');
        
        if (!user){
            return res.status(400).json({ message: "User not found" });
        }

        if (!await bcrypt.compare(password, user.password)){
            return res.status(400).json({ message: "Invalid password" });
        }

        res.send({ user });
    
    },
    forgot: async (req, res) => {

    },
    reset: async (req, res) => {

    }
}