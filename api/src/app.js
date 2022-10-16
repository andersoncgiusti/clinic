const express = require('express');
const app = express();
// const handlebars = require('express-handlebars');
// const handlebars = require('handlebars');

//imports routes
const statusRouter = require('./routes/status.router');
const agendamentoRouter = require('./routes/agendamento.router');
const prontuarioRouter = require('./routes/prontuarios.router');
const userRouter = require('./routes/user.router');
const cashRouter = require('./routes/cash.router');
const authRouter = require('./routes/auth.router');
const projectRouter = require('./routes/project.router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

// Config template email
// app.engine('handlebars', handlebars({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.use(agendamentoRouter);
app.use(statusRouter);
app.use(prontuarioRouter);
app.use(userRouter);
app.use(cashRouter);
app.use(authRouter);
app.use(projectRouter);


module.exports = app;