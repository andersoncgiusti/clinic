const Agendamento = require('../models/agendamento.model')
const ObjectID = require('mongodb').ObjectID

module.exports = { 
    agendamentoGet: async (req, res) => {  
        try {
            const agendamento = await Agendamento.find();
            const dataNow = new Date().toISOString().slice(0, 10);
            const dataYear = new Date();
            const year = dataYear.getFullYear();  

            // const a = dataNow.slice(8);
            const b = '+ 1';
            // const c = eval(a + b);
            // const d = dataNow.slice(0, -3);
            // const resultFormated = (d + '-' + c);
            // console.log(resultFormated);
            const e = dataNow.slice(5, -3);
            const g = eval(e + b);
            const secondDayDate = (year + '-' + g + '-01');

            const h = new Date().toLocaleDateString();
            const i = h.slice(3, -5);
            const dayInit = (year + '-' + i + '-' + h.slice(0, -8)).toString();
            const j = h.slice(0, -8);
            const k = eval(j + b);
            const dayFinaly = (year + '-' + i + '-' + k).toString();

            const count = await Agendamento.find({ 
                scheduleStartTime: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            }).count();    

            const date = new Date();
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const firstDayDate = firstDay.toISOString().slice(0, 10);

            const countMonth = await Agendamento.find({ 
                scheduleStartTime: { 
                    $gte:new Date(`${firstDayDate.toString()}`), 
                    $lt:new Date(`${secondDayDate.toString()}`)
                }
            }).count();   

            // agendamento.forEach((res) => {
            //     const month = res.scheduleStartTime.toISOString().slice(0, 10);
            //     const data = month.slice(5, -3);
            //     const countTrue = (dataNow.indexOf(data) !== -1);
            //     // console.log(countTrue); 
            // })

            res.status(200).json({
                message: 'Consulting scheduling with successfully!',
                agendamento: agendamento,
                agendamentoDay: count,
                agendamentoMonth: countMonth
            });
        } catch (error) {
            res.status(500).json({ message: error.message })
        } 
    },
    agendamentoGetId: async (req, res, next) => {
        // try {
        //     const agendamento = await Agendamento.findById(req.params.id).populate('userName')
        //     res.json(agendamento)
        //     if (agendamento == null) {
        //         return res.status(404).json({ message: 'Agenda not found!' })
        //     }
        // } catch (error) {
        //     res.status(500).json({ message: error.message })
        // }  
        // next()        
    },
    agendamentoPost: async (req, res) => {   
        const agendamento = new Agendamento({
            scheduleTitle: req.body.title, 
            scheduleStartTime: req.body.startTime, 
            scheduleEndTime: req.body.endTime
        })

        try {
            await agendamento.save().then(createdAgendamento => {
                res.status(201).json({
                    message: 'Create scheduling with successfully!',
                    agendamentoId: createdAgendamento._id
                })
            })
        } catch (error) {
            res.status(400).json({ message: error.message })
        } 
    },
    agendamentoUpdateId: async (req, res, next) => { 
        const agendamento = ({
            _id: req.body.id,
            scheduleTitle: req.body.title, 
            scheduleStartTime: req.body.startTime, 
            scheduleEndTime: req.body.endTime
        });

        try {            
            await Agendamento.updateOne({ _id: req.params.id }, agendamento)
            .then(updateAgendamento => {
                res.status(200).json({ 
                    message: 'Update scheduling with successfully!',
                    agendamentoId: updateAgendamento._id 
                })
            }) 
        } catch (error) {
            res.status(400).json({ message: error.message })
        }  
        next();
    },
    agendamentoDeleteId: async (req, res, next) => {
        try {
            const agendamento = await Agendamento.deleteOne({ _id: req.params.id })
            if (agendamento !== null) {
                return res.status(200).json({ message: 'Agendamento was deleted' })
            } else {
                return res.status(404).json({ message: 'Agendamento ID does not exist to be deleted' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }  
        next()
    }
}