const useRouter = require('./user.routes');
const rolesRouter = require('./roles.routes');

const appRoutes = (app) => {
    app.use('/api/users', useRouter);
    app.use('/api/roles', rolesRouter);
}


module.exports = appRoutes;