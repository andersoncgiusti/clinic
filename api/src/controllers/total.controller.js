require('dotenv').config();
const Session = require('../models/sessions.model');
const Total = require('../models/total.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    totalPost: async (req, res) => {  
        try {         
            const session = await Session.find(ObjectId(req.body.user));
            const qte = req.body.sessionPatient;
            let sessionId = parseInt(qte);
            for (const cashsId of session) {
                sessionId += eval(cashsId.sessionPatient);
            }

            const total = new Total({
                user: req.body.user,
                sessionPatient: sessionId
            })
            // console.log(total);
            total
                .save()
                .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Total session contabilized with successfully!",
                    result: result
                })
            })
           
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}