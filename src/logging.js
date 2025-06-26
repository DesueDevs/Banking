const fs = require('fs');
const path = require('path');

function writeLogToFile(logMessage, logFile = 'application.log') {
    const logPath = path.join(__dirname, logFile);
    fs.appendFile(logPath, logMessage + '\n', (err) => {
        if (err) {
            console.error('Failed to write log to file:', err);
        }
    });
}

/**
 * Logs messages to the console and writes them to a file based on the log type.
 * @param {string} logType - The type of log (e.g., 'accountLogin', 'accountCreation', 'withdrawalAttempt', 'depositAttempt').
 * @param {string} logLevel - The level of the log (e.g., 'info', 'warn', 'error'). 
 * @param {string} message - The log message.
 * @param {string} sourceIP - The IP address of the source making the request.
 * @param {string} resultStatus - The status of the operation (e.g., 'success', 'failure').
 * @param {Object} [additionalData={}] - Additional data to log (optional).
 */
function Logging(logType, logLevel, message, sourceIP, resultStatus, additionalData = {}) {
    switch (logType) {
        case 'accountLogin':
            writeLogToFile(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, 'logs/login.log');
            console.info(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, additionalData);
            break;
        case 'accountCreation':
            writeLogToFile(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, 'logs/creation.log');
            console.info(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, additionalData);
            break;
        case 'withdrawal':
            writeLogToFile(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, 'logs/withdrawals.log');
            console.warn(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, additionalData);
            break;
        case 'deposit':
            writeLogToFile(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, 'logs/deposits.log');
            console.warn(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, additionalData);
            break;
        case 'authentication':
            writeLogToFile(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, 'logs/authentication.log');
            console.info(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, additionalData);
            break;
        case 'general':
            writeLogToFile(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, 'logs/general.log');
            console.info(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, additionalData);
            break;
        default:
            writeLogToFile(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, 'logs/defaultErrors.log');
            console.log(`[${new Date().toISOString()}] [${logLevel}] [${sourceIP}] ${message}`, additionalData);
    }
}

module.exports = {
    Logging
};