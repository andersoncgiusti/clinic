require('dotenv').config();
const Session = require('../models/sessions.model');
const Total = require('../models/total.model');
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    sessionPost: async (req, res) => {
        try {          
            const session = await (await Session.create(req.body)).populate(['user']); 
          
            res.status(201).json({
                message: 'Create session with successfully!',
                session: session
            });             
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    sessionPostTotal: async (req, res) => {
        try {         
            
            const session = ({
                user: req.body.user,
                sessionPatient: 0
            });

            const total = await (await Total.create(session)).populate(['user']); 
      
            res.status(201).json({
                message: 'Create session with successfully!',
                total: total
            });             
            
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    sessionGet: async (req, res) => {
        try {          
            const session = await Session.find().populate(['user']);  

            const delete_zero = await Session.deleteMany({sessionPatient: {$eq: '0'}}).populate(['user']);  
            console.log(delete_zero);


            res.status(201).json({
                message: 'Consulting session patient with successfully!',
                session: session
            });             
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    sessionDelete: async (req, res, next) => {
        try {
            const session = await Session.deleteOne({ _id: req.params.id });
            
            if (session !== null) {
                return res.status(200).json({ message: 'Session was deleted' });
            } else {
                return res.status(404).json({ message: 'Session ID does not exist to be deleted' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
        next();
    },
    sessionPut: async (req, res, next) => {
        const session = ({
            sessionPatient: req.body.sessionPatient
        });

        try {
            await Total.updateOne({ _id: req.params.id }, session)
            .then(updateUser => {
                res.status(200).json({ 
                    message: 'Session finalized with successfully!',
                    userId: updateUser._id 
                })  
            });  
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
        next();
    },
    totalPut: async (req, res) => {  
        try {     
            const user = await User.findOne({_id: req.body.user}).populate('sessions');            
            const session = await Session.findOne(ObjectId(user._id)).populate('user');  
            const qte = parseInt(req.body.sessionPatient);                 
            const finalized = session.sessionPatient - qte;                

            const total = ({  
                user: req.body.user,
                sessionPatient: finalized
            })    
         
            await Session.updateOne({ user: req.body.user }, total)
            .then(result => {
                res.status(200).json({ 
                    message: 'Total session contabilized with successfully!',
                    result: result 
                })
            }); 

            const dados = {
                name: user.user.userName
            }
            
            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/finish.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);

            const messageBody = (template({
                name: `${ dados.name }`        
            }))

            const msg = {
                to: [
                  '' + `${user.user.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Sessão finalizada - Life Calendar',
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
    },
}
