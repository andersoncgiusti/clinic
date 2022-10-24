require('dotenv').config();
const Agendamento = require('../models/agendamento.model');
const User = require('../models/user.model');
const ObjectID = require('mongodb').ObjectID;

const sgMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = { 
    agendamentoGet: async (req, res) => {  
        try {
            const agendamento = await Agendamento.find().populate(['user']);
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
        const agendamentoBody = new Agendamento({
            scheduleTitle: req.body.title, 
            scheduleStartTime: req.body.startTime, 
            scheduleEndTime: req.body.endTime,
            user: req.body.user
        })

        try {
            // await agendamento.save().then(createdAgendamento => {
            //     res.status(201).json({
            //         message: 'Create scheduling with successfully!',
            //         agendamentoId: createdAgendamento._id
            //     })
            // })

            const agendamento = await (await Agendamento.create(agendamentoBody)).populate(['user']);

            res.status(201).json({
                message: 'Create scheduling with successfully!',
                agendamentoId: agendamento._id
            }); 

            const date = agendamento.scheduleStartTime.toISOString().slice(0, 10);
            const hoursInit = agendamento.scheduleStartTime.toLocaleTimeString().slice(0, 2);
            const hoursEnd = agendamento.scheduleEndTime.toLocaleTimeString().slice(0, 2);

            const dados = {
                name: agendamento.user.userName,
                date: date,
                hoursInit: hoursInit,
                hoursEnd: hoursEnd
            };

            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/scheduling.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);

            const messageBody = (template({
                name: `${ dados.name }`,   
                date: `${ dados.date }`, 
                hoursInit: `${ dados.hoursInit }`,
                hoursEnd: `${ dados.hoursEnd }` 
            }))

            const msg = {
                to: [
                  '' + `${agendamento.user.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Agendamento - Life Calendar',
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
            res.status(400).json({ message: error.message })
        } 
    },
    agendamentoUpdateId: async (req, res, next) => { 
        // const agendamento = ({
        //     _id: req.body.id,
        //     scheduleTitle: req.body.scheduleTitle, 
        //     scheduleStartTime: req.body.scheduleStartTime, 
        //     scheduleEndTime: req.body.scheduleEndTime,
        //     user: req.body.user
        // });

        const agendamentoBody = new Agendamento({
            _id: req.params.id,
            scheduleTitle: req.body.title, 
            scheduleStartTime: req.body.startTime, 
            scheduleEndTime: req.body.endTime,
            user: req.body.user
        });
        
        const user = await User.findById(agendamentoBody.user);
        const date = agendamentoBody.scheduleStartTime.toISOString().slice(0, 10);
        const hoursInit = agendamentoBody.scheduleStartTime.toLocaleTimeString().slice(0, 2);
        const hoursEnd = agendamentoBody.scheduleEndTime.toLocaleTimeString().slice(0, 2);

        const dados = {
            name: user.userName,
            date: date,
            hoursInit: hoursInit,
            hoursEnd: hoursEnd
        };      

        console.log('dados', dados);

        const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/rescheduling.handlebars"), "utf-8");
        const template = handlebars.compile(emailTemplate);

        const messageBody = (template({
            name: `${ dados.name }`,   
            date: `${ dados.date }`, 
            hoursInit: `${ dados.hoursInit }`,
            hoursEnd: `${ dados.hoursEnd }` 
        }))

        const msg = {
            to: [
              '' + `${user.userEmail}` + ''
            ], 
            from: '<'+`${process.env.FROM}`+'>',
            subject: 'Reagendamento - Life Calendar',
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
        
        try {            

            await Agendamento.updateOne({ _id: req.params.id }, agendamentoBody)
            .then(updateAgendamento => {
                res.status(200).json({ 
                    message: 'Update scheduling with successfully!',
                    agendamentoId: updateAgendamento._id 
                })
            });
            
        } catch (error) {
            res.status(400).json({ message: error.message })
        }  
        next();

    },
    agendamentoDeleteId: async (req, res, next) => {         
             
        const agendamentoBody = new Agendamento({
            _id: req.params.id,
            user: req.body.user
        });
        
        const scheduling = await Agendamento.findById(agendamentoBody._id).populate(['user']); 
        
        const user = await User.findById(scheduling.user._id); 
        const date = scheduling.scheduleStartTime.toISOString().slice(0, 10);
        const hoursInit = scheduling.scheduleStartTime.toISOString().slice(11, 13);
        const hoursEnd = scheduling.scheduleEndTime.toISOString().slice(11, 13);        

        const dados = {
            name: user.userName,
            date: date,
            hoursInit: hoursInit,
            hoursEnd: hoursEnd
        };
        
        const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/cancel-scheduling.handlebars"), "utf-8");
        const template = handlebars.compile(emailTemplate);

        const messageBody = (template({
            name: `${ dados.name }`,   
            date: `${ dados.date }`, 
            hoursInit: `${ dados.hoursInit }`,
            hoursEnd: `${ dados.hoursEnd }` 
        }))
       
        const msg = {
            to: [
              '' + `${user.userEmail}` + ''
            ], 
            from: '<'+`${process.env.FROM}`+'>',
            subject: 'Cancelamento - Life Calendar',
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

        try {
            const agendamento = await Agendamento.deleteOne({ _id: req.params.id });
            if (agendamento !== null) {
                return res.status(200).json({ message: 'Agendamento was deleted' });
            } else {
                return res.status(404).json({ message: 'Agendamento ID does not exist to be deleted' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
        next();
    }
}