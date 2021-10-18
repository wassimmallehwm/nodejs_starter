const exec = require('child_process').exec;

const createBackup = () => {
    //CREATE BACKUP
    exec("mongodump --host localhost --port 27017 --db " + process.env.APP_NAME + " --out " + __dirname, (error, stdout, stderr) => {
        console.log("error : ", error)
        console.log("stdout : ", stdout)
        console.log("stderr : ", stderr)
    });
}
const restoreBackup = () => {
    //RESTORE BACKUP
    exec("mongorestore --host localhost --port 27017 --db " + process.env.APP_NAME + __dirname, (error, stdout, stderr) => {
        console.log("error : ", error)
        console.log("stdout : ", stdout)
        console.log("stderr : ", stderr)
    });
}

module.exports = {createBackup, restoreBackup};