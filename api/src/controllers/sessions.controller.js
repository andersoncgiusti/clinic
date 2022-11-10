require('dotenv').config();
const Session = require('../models/sessions.model');

module.exports = {
    sessionPost: async (req, res) => {
        try {          
            const session = await (await Session.create(req.body)).populate(['user']);
            
            console.log(session);
            res.status(201).json({
                message: 'Create session with successfully!',
                session: session
            });             
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    sessionGet: async (req, res) => {
        try {          
            const session = await Session.find(req.body).find().populate(['user']);
    
            res.status(201).json({
                message: 'Consulting session patient with successfully!',
                session: session
            });             
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    sessionDelete: async (req, res) => {
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
}
