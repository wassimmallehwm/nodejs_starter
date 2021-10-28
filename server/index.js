const express = require('express');
const app = express();
const { createBackup, restoreBackup } = require('./backup');
require('dotenv').config();

const PORT = parseInt(process.env.PORT, 10) || 4000;

const dbConnect = require('./database/databaseConnect');
const globalMiddelwares = require('./middleware/global');
const appRoutes = require('./routers/index.routes');

globalMiddelwares(app, __dirname);
dbConnect();
appRoutes(app);

// createBackup();
// restoreBackup();

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});