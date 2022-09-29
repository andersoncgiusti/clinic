const Prontuario = require('../models/prontuarios.model')
const User = require('../models/user.model')
const ObjectID = require('mongodb').ObjectID

module.exports = { 
    prontuarioGet: async (req, res) => {  
        try {
            // const idUser = req.body._id;
            // const prontuarios = await Prontuario.find({ user: {$eq: idUser} });
            const prontuarios = await Prontuario.find();
            res.status(200).json({
                message: 'Consulting prontaios with successfully!',
                prontuario: prontuarios
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }     
    },
    prontuarioGetId: async (req, res, next) => {
        try {
            const idUser = ({_id: req.params.id});
            const prontuarios = await Prontuario.find({ user: {$eq: idUser} });

            res.status(200).json({
                message: 'Consulting prontuarios with successfully!',
                prontuario: prontuarios
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }         
    },
    prontuarioPost: async (req, res) => { 
        try {
            const chart = await Prontuario.create(req.body);
            console.log(chart);

            res.status(201).json({
                message: 'Create prontuario with successfully!',
                chart: chart
            }); 
        } catch (error) {
            res.status(400).json({ message: error.message })
        }              
        
    },
    prontuarioPatchId: async (req, res, next) => { 
        // try {
        //     const updateProntuario = await Prontuario.findByIdAndUpdate(req.params.id, {
        //         treatment: req.body.treatment
        //     })
        //     res.status(200).json({ message: 'Prontuario was updated' })
        // } catch (error) {
        //     res.status(400).json({ message: error.message })
        // }  
        // next()
    },
    prontuarioDeleteId: async (req, res, next) => {
        try {
            const prontuario = await Prontuario.deleteOne({ _id: req.params.id })
            if (prontuario !== null) {
                return res.status(200).json({ message: 'Prontuario was deleted' })
            } else {
                return res.status(404).json({ message: 'Prontuario ID does not exist to be deleted' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }  
        next()
    }
}

