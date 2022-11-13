require('dotenv').config();
const Session = require('../models/sessions.model');
const Total = require('../models/total.model');

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
}
