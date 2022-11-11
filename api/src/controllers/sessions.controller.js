require('dotenv').config();
const Session = require('../models/sessions.model');
const Total = require('../models/total.model');

module.exports = {
    sessionPost: async (req, res) => {
        try {          
            const session = await (await Session.create(req.body)).populate(['user']);  

            // const total = await (await Total.create(req.body)).populate(['user']); 
            
            const total = new Total({
                user: req.body.user,
                sessionPatient: req.body.sessionPatient
            });

            let totals = 0
            // totals += eval(sessions.sessionPatient)
            console.log(totals += eval(total.sessionPatient));

            // total
            //     .save()
            //     .then(result => {
            //     console.log(result);
            //     res.status(201).json({
            //         message: "Total saved!",
            //         result: result
            //     })
            // })

            // const id = qte.filter((resp) => {
            //     if (resp.user._id) {
            //         let total = 0
            //         for (const sessions of qte) {
            //             total += eval(sessions.sessionPatient)
            //             console.log(total);
            //         }
            //     }
            // })


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

            const qte = session.filter((resp) => {
                return resp.sessionPatient;
            })

            // const id = qte.filter((resp) => {
            //     if (resp.user._id) {
            //         let total = 0
            //         for (const sessions of qte) {
            //             total += eval(sessions.sessionPatient)
            //             console.log(total);
            //         }
            //     }
            // })

            let total = 0
            for (const sessions of qte) {
                total += eval(sessions.sessionPatient)
            }

            // const total = new Total({
            //     user: req.body.user,
            //     sessionTotal: req.body.sessionTotal
            // });
            // console.log(total);

            // total
            //     .save()
            //     .then(result => {
            //     console.log(result);
            //     res.status(201).json({
            //         message: "Total saved!",
            //         result: result
            //     })
            // })
    
            res.status(201).json({
                message: 'Consulting session patient with successfully!',
                session: session,
                total: total
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
            await Session.updateOne({ _id: req.params.id }, session)
            .then(updateSession => {
                res.status(200).json({ 
                    message: 'Session finalized with successfully!',
                    sessionId: updateSession._id 
                })
            });  
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
        next();
    },
}
