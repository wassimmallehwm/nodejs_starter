const mongoose = require('mongoose');
const dbSeeder = require('./databaseSeeder');

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    const connection = mongoose.connection;
    connection.once('open', async () => {
        console.log('Connected to DataBase');
        await dbSeeder();
    })
}

module.exports = dbConnect;