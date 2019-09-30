const helmet = require('helmet')
const express = require('express')
const passport = require('passport');
const oauth = require('../middleware/oauth');

oauth(passport);

module.exports = function (app) {
    app.use(passport.initialize());

    app.use(cookieSession({
        name: 'session',
        keys: ['123'],
      }));
    app.use(cookieParser());

    app.use(helmet())
    
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        next()
    })
}
