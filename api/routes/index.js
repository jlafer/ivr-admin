var createError = require('http-errors');

const authRouter = require('./auth');
var ivrAppsRouter = require('./ivrApps');
var organizationsRouter = require('./organizations');
var testAPIRouter = require("./testAPI");
var explorerRouter = require('./apiExplorer');

const addRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/organizations/:orgId/ivrApps', ivrAppsRouter);
  app.use('/organizations', organizationsRouter);
  app.use("/testAPI", testAPIRouter);
  app.use('/', explorerRouter);
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
};



module.exports = {
  addRoutes
};
