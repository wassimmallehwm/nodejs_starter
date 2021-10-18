const AppConfig = require('../models/app.config.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const createAppConfig = async () => {
    const appconfig = new AppConfig();
    appconfig.name = 'Supply chain';
    appconfig.version = '1.0.0';
    await appconfig.save();
}

const createAdmin = async (role) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash("password", salt);
    const user = new User();
    user.email = "admin@admin.com";
    user.password = hashedPassword;
    user.enabled = true;
    user.username = "admin";
    user.firstname = "Admin";
    user.lastname = "Admin";
    user.roles = [role._id];
    await user.save();
}


const createCollections = async () => {
    const admin = new Role();
    admin.label = 'ADMIN';
    const adminRole = await admin.save();

    await createAdmin(adminRole);
}


const changeAppVersion = async (oldVersion, version) => {
    const appData = await AppConfig.findOne({version: oldVersion})
    appData.version = version;
    appData.save();
}


const migration = async (data) => {
}

const dbSeeder = async () => {
    AppConfig.find().then(
        async res => {
            if (res && res.length > 0) {
                console.log('App already initialized !')
                return;
            } else {
                console.log('Initializing App ...')
                await createAppConfig();
                await createCollections();
                console.log('Initializing initialized successfully !')
            }
        },
        error => {
            console.log(error);
        }
    )
}


module.exports = dbSeeder;