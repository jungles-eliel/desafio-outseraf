const log4js = require('log4js');

log4js.configure({
    appenders: { 
        file: { type: 'file', filename: 'logs/application.log' },
        console: { type: 'console' } 
    },
    categories: { 
        default: { 
            appenders: ['file', 'console'], 
            level: process.env.LOG_LEVEL || 'info' 
        } 
    }
});

const logger = log4js.getLogger();

module.exports = logger;