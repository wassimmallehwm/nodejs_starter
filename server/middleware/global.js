const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const globalMiddelwares = (app) => {
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.use(express.static('resources'));
    app.use(cors());
    app.use(express.json());

    // var accessLogStream = fs.createWriteStream(path.join(__dirname , 'logs', (new Date()).toLocaleDateString() + '.txt'), { flags: 'a' })

    // app.use(morgan('dev', {
    //     skip: function (req, res) { return res.statusCode < 400 }
    //   }))

    // app.use(morgan('common', { stream: accessLogStream }));

    app.use(morgan('dev'));
}

module.exports = globalMiddelwares;