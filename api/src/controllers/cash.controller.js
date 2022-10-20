require('dotenv').config();
const Cash = require('../models/cash.model');
const sgMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = { 
    cashGet: async (req, res) => {  
        try {
            
            const dataNow = new Date().toISOString().slice(0, 10);
            const dataYear = new Date();
            const year = dataYear.getFullYear(); 
            const b = '+ 1';
            const e = dataNow.slice(5, -3);
            const g = eval(e + b);
            const secondDayDate = (year + '-' + g + '-01');
            const h = new Date().toLocaleDateString();
            const i = h.slice(3, -5);
            const dayInit = (year + '-' + i + '-' + h.slice(0, -8)).toString();
            const j = h.slice(0, -8);
            const k = eval(j + b);
            const dayFinaly = (year + '-' + i + '-' + k).toString();

            const credit = await Cash.find({ 
                pay: {$eq: 'credito'},
                created: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            }).count(); 

            const debt = await Cash.find({ 
                pay: {$eq: 'debito'},
                created: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            }).count(); 

            const money = await Cash.find({ 
                pay: {$eq: 'dinheiro'},
                created: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            }).count();                         

            const date = new Date();
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const firstDayDate = firstDay.toISOString().slice(0, 10);

            const countMonth = await Cash.find({ 
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            }).count();  

            const creditTotal = await Cash.find({ 
                pay: {$eq: 'credito'},
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            }).count();  

            const debtTotal = await Cash.find({ 
                pay: {$eq: 'debito'},
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            }).count();  

            const moneyTotal = await Cash.find({ 
                pay: {$eq: 'dinheiro'},
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            }).count();  

            const saleDay = await Cash.find({
                created: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            }).populate(['user']); 
            
            const saleMonth = await Cash.find({
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            }).populate(['user']);

            const creditValue = await Cash.find({ 
                pay: {$eq: 'credito'},
                created: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            });

            let cashsDayCredit = 0
            for (const cashs of creditValue) {
                cashsDayCredit += eval(cashs.total)
            }

            const debtValue = await Cash.find({ 
                pay: {$eq: 'debito'},
                created: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            });

            let cashsDayDebt = 0
            for (const cashs of debtValue) {
                cashsDayDebt += eval(cashs.total)
            }

            const moneyValue = await Cash.find({ 
                pay: {$eq: 'dinheiro'},
                created: { 
                    $gte:new Date(`${dayInit}`), 
                    $lt:new Date(`${dayFinaly}`)
                }
            });

            let cashsDayMoney = 0
            for (const cashs of moneyValue) {
                cashsDayMoney += eval(cashs.total)
            }

            const creditValueMonth = await Cash.find({ 
                pay: {$eq: 'credito'},
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            });

            let cashsMonthCredit = 0
            for (const cashs of creditValueMonth) {
                cashsMonthCredit += eval(cashs.total)
            }

            const debtValueMonth = await Cash.find({ 
                pay: {$eq: 'debito'},
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            });

            let cashsMonthDebt = 0
            for (const cashs of debtValueMonth) {
                cashsMonthDebt += eval(cashs.total)
            }

            const moneyValueMonth = await Cash.find({ 
                pay: {$eq: 'dinheiro'},
                created: { 
                    $gte:new Date(`${firstDayDate}`), 
                    $lt:new Date(`${secondDayDate}`)
                }
            });

            let cashsMonthMoney = 0
            for (const cashs of moneyValueMonth) {
                cashsMonthMoney += eval(cashs.total)
            }

            const cashs = await Cash.find().populate(['user']);
            res.status(200).json({
                message: 'Consulting Cashs with successfully!',
                cashs: cashs,
                credit: credit,
                debt: debt,
                money: money,
                countMonth: countMonth,
                creditTotal: creditTotal,
                debtTotal: debtTotal, 
                moneyTotal: moneyTotal,
                saleDay: saleDay,
                saleMonth: saleMonth,
                cashsDayCredit: cashsDayCredit,
                cashsDayDebt: cashsDayDebt,
                cashsDayMoney: cashsDayMoney,
                cashsMonthCredit: cashsMonthCredit,
                cashsMonthDebt: cashsMonthDebt,
                cashsMonthMoney: cashsMonthMoney
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        } 
    },
    cashGetId: async (req, res, next) => {
              
    },
    cashPost: async (req, res) => {  
        try {
            const cash = await (await Cash.create(req.body)).populate(['user']);
            res.status(201).json({
                message: 'Create cash with successfully!',
                cash: cash
            }); 

            const date = cash.created.toISOString().slice(0, 10);
         
            const dados = {
                name: cash.user.userName,
                sessions: cash.sessions,
                value: cash.value,
                pay: cash.pay,
                total: cash.total,
                created: date
            };

            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/cash.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);

            const messageBody = (template({
                name: `${ dados.name }`,   
                sessions: `${ dados.sessions }`, 
                value: `${ dados.value }`,    
                pay: `${ dados.pay }`,  
                total: `${ dados.total }`,
                created: `${ dados.created }`    
            }))

            const msg = {
                to: [
                  '' + `${cash.user.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Compra - Life Calendar',
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
    cashPatchId: async (req, res, next) => {
       
    },
    cashDeleteId: async (req, res, next) => {
        try {
            const cash = await Cash.deleteOne({ _id: req.params.id })
            if (cash !== null) {
                return res.status(200).json({ message: 'Cash was deleted' })
            } else {
                return res.status(404).json({ message: 'Cash ID does not exist to be deleted' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }  
        next()
    }
}