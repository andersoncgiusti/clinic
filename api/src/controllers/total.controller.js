require('dotenv').config();
const Session = require('../models/sessions.model');
const Total = require('../models/total.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    totalGet: async (req, res) => {
        try {          
            const total = await Total.find(req.body).populate(['user']); 

            res.status(201).json({
                message: 'Consuting total with successfully!',
                total: total
            });             
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    totalPost: async (req, res) => {  
        try {         
            // const session = await Session.find(ObjectId(req.body.user));
          
            // let sessionId = 0;
            // for (const cashsId of session) {
            //     sessionId += eval(cashsId.sessionPatient);
            // }
            
            // const total = new Total({
            //     user: req.body.user,
            //     sessionPatient: sessionId
            // })
            
            // total
            //     .save()
            //     .then(result => {
            //     console.log(result);
            //     res.status(201).json({
            //         message: "Total session contabilized with successfully!",
            //         result: result
            //     })
            // })

            const session = await Session.find(ObjectId(req.body.user));
            
            // const qte = req.body.sessionPatient;

            let sessionId = 0;
            for (const cashsId of session) {
                sessionId += eval(cashsId.sessionPatient);
            }

            // const finalized = (sessionId - qte);

            const total = ({
                user: req.body.user,
                sessionPatient: sessionId
            })            
            console.log(total);
            
            await Total.updateOne({ user: req.body.user }, total)
            .then(result => {
                console.log(result);
                res.status(200).json({ 
                    message: 'Total session contabilized with successfully!',
                    result: result 
                })
            }); 
           
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    totalPut: async (req, res) => {  
        try {         
            const session = await Session.find(ObjectId(req.body.user));
            
            const qte = req.body.sessionPatient;

            let sessionId = 0;
            for (const cashsId of session) {
                sessionId += eval(cashsId.sessionPatient);
            }

            const finalized = (sessionId - qte)

            const total = ({
                user: req.body.user,
                sessionPatient: finalized
            })            
            
            await Total.updateOne({ user: req.body.user }, total)
            .then(result => {
                res.status(200).json({ 
                    message: 'Total session contabilized with successfully!',
                    result: result 
                })
            }); 
           
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    totalForPut: async (req, res) => {  
        try {         
            const session = await Session.find(ObjectId(req.body.user));
            console.log(session);
            // let sessionId = 0;
            // for (const cashsId of session) {
            //     sessionId += eval(cashsId.sessionPatient);
            // }
            
            // const total = new Total({
            //     user: req.body.user,
            //     sessionPatient: sessionId
            // })
            // console.log(total);
            // await Total.updateOne({ user: req.body.user, }, total)
            // .then(result => {
            //     res.status(200).json({ 
            //         message: 'Total session contabilized with successfully!',
            //         result: result 
            //     })
            // }); 
           
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}