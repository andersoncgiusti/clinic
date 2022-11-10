require('dotenv').config();
const Cash = require('../models/cash.model');

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
            res.status(400).json({ message: error.message })
        }
    },
    sessionGet: async (req, res) => {
        // try {          
        //     const session = await (await Session.create(req.body)).populate(['user']);
        //     console.log(session);  
    
        //     res.status(201).json({
        //         message: 'Create session with successfully!',
        //         session: session
        //     });             
        // } catch (error) {
        //     res.status(400).json({ message: error.message })
        // }
    }
}
