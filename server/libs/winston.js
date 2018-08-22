var appRoot = require('app-root-path');
var winston = require('winston');

const tsFormat =()=> ( new data()).toLocaleTimeString ( ) ; 
var logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: `${appRoot}/logs/appErro.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
      timestamp: tsFormat,
      datePattern: 'aaaa-MM-dd',
    })],
  exceptionHandlers: [
    new winston.transports.File({ filename: `${appRoot}/logs/appException.log` })
  ],
  exitOnError: false,
});
logger.level= 'error';
logger.error('Deu  Merda',{color: 'red' });

var logger1 = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `${appRoot}/logs/appInfo.log`,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
      timestamp: tsFormat,
      datePattern: 'aaaa-MM-dd',
    }),
  ],
  exitOnError: false,
});
logger1.level= 'info';
logger1.info('Informação',{color: 'red' });

var logger2 = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File({
      level: 'silly',
      filename: `${appRoot}/logs/appSilly.log`,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
      timestamp: tsFormat,
      datePattern: 'aaaa-MM-dd',
    }),
  ],
  exitOnError: false,
});

logger2.level= 'silly';


logger.stream = {
  write: function(message, encoding) {
    logger.error(message);
  },
};

logger1.stream = {
  write: function(message, encoding) {
    logger1.info(message);
  },
};

logger2.stream = {
  write: function(message, encoding) {
    logger2.debug(message);
  },
};

module.exports = {logger,logger1,logger2};
