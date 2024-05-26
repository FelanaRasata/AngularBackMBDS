import ansiColors from 'ansi-colors';
import dayjs from 'dayjs';
import * as util from 'util';
import { DEV_MODE } from '../config/apiServer.config.js';


const LOG_LEVEL = {
    error: 'error',
    warn: 'warn',
    info: 'info',
};


const LOG_COLORS = {
    error: ansiColors.red,
    warn: ansiColors.yellow,
    info: ansiColors.blue,
};


function colorize(message, level) {

    const color = LOG_COLORS[level] ?? ansiColors.whiteBright;

    return color(message);

}


function buildTimeLog(level) {

    return colorize(`[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}] [${String(level).toUpperCase()}]`, level);

}


function formatMessage(message, level) {

    const formattedMessage = typeof message === 'object' ? util.inspect(message, { depth: null }) : String(message);

    return colorize(formattedMessage, level);

}


function formatMessages(messages, level) {

    return messages.map(message => formatMessage(message, level));

}


export function info(message, ...optionalParams) {

    console.log(
        [buildTimeLog(LOG_LEVEL.info), formatMessage(message)].join(' '),
        ...formatMessages(optionalParams),
    );

}


export function error(message, ...optionalParams) {

    if (DEV_MODE) {

        console.trace(message, ...optionalParams);

    } else {

        console.error(
            [buildTimeLog(LOG_LEVEL.error), formatMessage(message, LOG_LEVEL.error)].join(' '),
            ...formatMessages(optionalParams, LOG_LEVEL.error),
        );

    }

}


export function warn(message, ...optionalParams) {

    console.log(
        [buildTimeLog(LOG_LEVEL.warn), formatMessage(message, LOG_LEVEL.warn)].join(' '),
        ...formatMessages(optionalParams, LOG_LEVEL.warn),
    );

}


const Loggeo = {
    info: function (message, ...optionalParams) {

        console.log(
            [buildTimeLog(LOG_LEVEL.info), formatMessage(message)].join(' '),
            ...formatMessages(optionalParams),
        );

    },
    error: function (message, ...optionalParams) {

        if (DEV_MODE) {

            console.trace(message, ...optionalParams);

        } else {

            console.error(
                [buildTimeLog(LOG_LEVEL.error), formatMessage(message, LOG_LEVEL.error)].join(' '),
                ...formatMessages(optionalParams, LOG_LEVEL.error),
            );

        }

    },
    warn: function (message, ...optionalParams) {

        console.log(
            [buildTimeLog(LOG_LEVEL.warn), formatMessage(message, LOG_LEVEL.warn)].join(' '),
            ...formatMessages(optionalParams, LOG_LEVEL.warn),
        );

    },
};


export default Loggeo;
