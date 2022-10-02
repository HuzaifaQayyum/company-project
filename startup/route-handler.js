const employeesRouter = require('../routes/employees/employees.router');
const authRouter = require('../routes/auth/auth.router');
const nearMeRouter = require('../routes/near_me/near_me.router');
const weatherRouter = require('../routes/weather/weather.router');


module.exports = app => { 
    app.use('/auth', authRouter);
    app.use('/near-me', nearMeRouter);
    app.use('/weather', weatherRouter);

    app.use('', employeesRouter);
}